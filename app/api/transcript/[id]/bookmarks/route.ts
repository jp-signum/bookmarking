import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const transcriptId = parseInt(params.id, 10); 
    const { quoteId, folderId } = await req.json();

    if (!quoteId || !folderId) {
      return NextResponse.json(
        { error: "Missing required fields: quoteId and folderId" },
        { status: 400 }
      );
    }

    // Validate the folder exists
    const folderExists = await prisma.bookmarkFolder.findUnique({
      where: { id: parseInt(folderId, 10) },
    });

    if (!folderExists) {
      return NextResponse.json(
        { error: "Folder does not exist" },
        { status: 404 }
      );
    }

    // Create a new bookmark
    const bookmark = await prisma.bookmark.create({
      data: {
        folderId: parseInt(folderId, 10),
        transcriptId,
        quoteId: parseInt(quoteId, 10),
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}
