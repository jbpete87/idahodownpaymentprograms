import { AMI_LIMITS, CITY_TO_COUNTY } from "@/lib/programs-data";

/**
 * Get the county for a program based on its geography
 */
export function getProgramCounty(
  geographyType: string,
  geographyValues: string[]
): string {
  if (geographyType === "statewide") {
    return "Ada"; // Default to Treasure Valley / Boise metro
  }
  if (geographyType === "county") {
    return geographyValues[0]; // First county in list
  }
  if (geographyType === "city") {
    // Look up county from city
    const city = geographyValues[0];
    return CITY_TO_COUNTY[city] || "Ada";
  }
  return "Ada";
}

/**
 * Get AMI limits for a specific county
 */
export function getCountyAMILimits(county: string) {
  return AMI_LIMITS.filter((limit) => limit.county === county).sort(
    (a, b) => a.householdSize - b.householdSize
  );
}

/**
 * Get the AMI value for a specific percentage
 */
export function getAMIValue(
  limit: (typeof AMI_LIMITS)[0],
  percent: 80 | 100 | 120
): number {
  switch (percent) {
    case 80:
      return limit.ami80;
    case 100:
      return limit.ami100;
    case 120:
      return limit.ami120;
  }
}

