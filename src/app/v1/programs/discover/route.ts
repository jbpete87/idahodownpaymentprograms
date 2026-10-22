import {
  authorizeDpaRequest,
  discoverPrograms,
  jsonError,
  jsonOk,
  readJsonObject,
  validateDiscoverBody,
} from "@/lib/dpa-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /v1/programs/discover
 *
 * Location / buyer-context program lookup for Area Pulse and other callers.
 * Auth: Authorization: Bearer <DPA_API_SECRET>
 */
export async function POST(request: Request) {
  const unauthorized = authorizeDpaRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await readJsonObject(request);
    const input = validateDiscoverBody(body);
    const { programs, filters } = discoverPrograms(input);

    return jsonOk({
      count: programs.length,
      filters,
      programs,
    });
  } catch (err) {
    return jsonError(err);
  }
}
