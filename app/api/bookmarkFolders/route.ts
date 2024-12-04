// bookmark folders handler POST/GET
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// handle GET requests to fetch all bookmark folders
export async function GET() {
  try {
    const folders = await prisma.bookmarkFolder.findMany({
      include: {
        bookmarks: true, 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error fetching bookmark folders:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmark folders" },
      { status: 500 }
    );
  }
}

// handle POST requests to create a new bookmark folder
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    // Check if a folder with the same name already exists
    const existingFolder = await prisma.bookmarkFolder.findUnique({
      where: { name },
    });

    if (existingFolder) {
      return NextResponse.json(existingFolder, { status: 200 });
    }

    // Create the folder if it doesn't exist
    const newFolder = await prisma.bookmarkFolder.create({
      data: { name },
    });

    return NextResponse.json(newFolder, { status: 201 });
  } catch (error) {
    console.error("Error creating bookmark folder:", error);
    return NextResponse.json(
      { error: "Failed to create bookmark folder" },
      { status: 500 }
    );
  }
}
