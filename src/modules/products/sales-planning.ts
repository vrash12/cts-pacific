export type PrivateSalesPlanningItem = {
  name: string;
  status: "CLIENT_DETAILS_REQUIRED";
  visibility: "ADMIN_ONLY";
  catalogFoundation: string;
  decisionsRequired: readonly string[];
};

export const privateSalesPlanningItems: readonly PrivateSalesPlanningItem[] = [
  {
    name: "Safety Equipment",
    status: "CLIENT_DETAILS_REQUIRED",
    visibility: "ADMIN_ONLY",
    catalogFoundation:
      "No safety-equipment category or product record has been approved. Construction equipment rental is represented separately as a public request-based service.",
    decisionsRequired: [
      "Confirm whether safety items are sold, rented, sourced, or provided through another model.",
      "Provide the approved safety-equipment categories.",
      "Provide approved products, brands, descriptions, images, SKUs, prices, and inventory rules.",
      "Confirm delivery, pickup, rental, operator, warranty, return, and compliance responsibilities where applicable.",
    ],
  },
  {
    name: "Heavy Equipment",
    status: "CLIENT_DETAILS_REQUIRED",
    visibility: "ADMIN_ONLY",
    catalogFoundation:
      "No Heavy Equipment category, product, rental inventory, or equipment-ownership claim has been created.",
    decisionsRequired: [
      "Confirm whether equipment is sold, rented, CTS-operated, subcontracted, or sourced.",
      "Provide the approved equipment classes and any service-versus-product boundaries.",
      "Confirm ownership, operator, transport, mobilization, scheduling, permit, and insurance responsibilities.",
      "Provide approved products or equipment records, images, pricing, availability, and commercial terms before catalog entry.",
    ],
  },
] as const;
