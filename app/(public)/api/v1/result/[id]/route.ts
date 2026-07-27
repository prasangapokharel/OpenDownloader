import { getResult } from "@/lib/store"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const result = getResult(id)

  if (!result) {
    return Response.json({ error: "Result not found" }, { status: 404 })
  }

  if (result.status === "pending" || result.status === "processing") {
    return Response.json(result, { status: 200 })
  }

  return Response.json(result, { status: 200 })
}
