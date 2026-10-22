import {
  authorizeDpaRequest,
  jsonError,
  jsonOk,
  readJsonObject,
  screenPrograms,
  validateScreenBody,
} from "@/lib/dpa-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /v1/programs/screen
 *
 * Full eligibility screening via the site's matching engine.
 * Auth: Authorization: Bearer <DPA_API_SECRET>
 */
export async function POST(request: Request) {
  const unauthorized = authorizeDpaRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await readJsonObject(request);
    const input = validateScreenBody(body);
    const { matches, answers } = screenPrograms(input);

    return jsonOk({
      count: matches.length,
      answers,
      matches,
    });
  } catch (err) {
    return jsonError(err);
  }
}
