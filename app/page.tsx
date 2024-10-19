"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [groupType, setGroupType] = useState<string>("");
  const [customName, setCustomName] = useState<string>("");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    const filename = customName || file.name; // Use custom name or fallback to original file name

    // Sending the file to the server
    await fetch(`/api/file?filename=${filename}&groupType=${groupType}`, {
      method: "POST",
      body: file,
    });

    // Display success message
    setUploadMessage("File uploaded");

    // Reset form fields after successful upload
    setGroupType("");
    setCustomName("");
    if (inputFileRef.current) {
      inputFileRef.current.value = ""; // Clears file input
    }

    // Automatically hide the message after 2 seconds
    setTimeout(() => {
      setUploadMessage("");
    }, 2000); // 2 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-6 text-6xl font-semibold">File Management App</h1>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload Your File</CardTitle>
          <CardDescription>
            Select a group and upload your file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="groupType">Group Type</Label>
                <Select value={groupType} onValueChange={setGroupType}>
                  <SelectTrigger id="groupType">
                    <SelectValue placeholder="Select group type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="customName">Custom File Name</Label>
                <Input
                  id="customName"
                  placeholder="Enter custom file name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">File</Label>
                <input name="file" ref={inputFileRef} type="file" required />
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Upload
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {uploadMessage && (
            <div className="text-green-500 font-semibold">{uploadMessage}</div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
