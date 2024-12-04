// handler for fetching folders and their bookmarks and generating CSV
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { parse } from "json2csv";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const folders = await prisma.bookmarkFolder.findMany({
      include: {
        bookmarks: {
          include: {
            transcript: true,
            quote: {
              select: {
                question: true,
                answer: true,
              },
            },
          },
        },
      },
    });

    // Flatten data for CSV export
    const data = folders.flatMap((folder) =>
      folder.bookmarks.map((bookmark) => ({
        folderName: folder.name,
        transcriptName: bookmark.transcript?.interview_name || "Unknown",
        question: bookmark.quote?.question || "N/A",
        answer: bookmark.quote?.answer || "N/A",
      }))
    );

    // Convert data to CSV
    const csv = parse(data);

    // Return CSV as a downloadable file
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="bookmarks.csv"',
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 }
    );
  }
}
