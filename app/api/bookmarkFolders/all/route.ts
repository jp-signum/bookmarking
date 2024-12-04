// handler to fetch all folders and their associated bookmarks
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
