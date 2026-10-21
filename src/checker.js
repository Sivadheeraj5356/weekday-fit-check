const RULES = [
  {
    id: "role-type",
    label: "Role is an internship or entry-level role",
    check: ({ listing }) => /intern|entry.?level/i.test(`${listing.title} ${listing.seniority}`),
    fix: "Confirm the seniority level before applying."
  },
  {
    id: "location",
    label: "Location fits an India or remote constraint",
    check: ({ listing }) => /remote|india|bengaluru|bangalore/i.test(listing.location || ""),
    fix: "Do not answer a location question until the work model is explicit."
  },
  {
    id: "pay",
    label: "Compensation is stated and not unpaid",
    check: ({ listing }) => {
      const text = `${listing.stipend || ""} ${listing.salary || ""}`.toLowerCase();
      return text.length > 0 && !/unpaid/.test(text);
    },
    fix: "Verify whether the role is paid before committing time."
  },
  {
    id: "availability",
    label: "Candidate availability covers the stated start",
    check: ({ listing, profile }) => {
      const start = (listing.startDate || "").toLowerCase();
      if (!/immediate|as soon as possible/.test(start)) return true;
      return (profile.availableStartDays ?? 99) <= 7;
    },
    fix: "Answer the start-date question only with a confirmed availability."
  },
  {
    id: "proof",
    label: "Application includes proof of shipped work",
    check: ({ profile }) => Boolean(profile.repositoryUrl && profile.portfolioUrl),
    fix: "Add a relevant public project and portfolio link."
  }
];

export function evaluateApplication(listing, profile) {
  const checks = RULES.map((rule) => ({
    id: rule.id,
    label: rule.label,
    passed: Boolean(rule.check({ listing, profile })),
    fix: rule.fix
  }));
  const passed = checks.filter((check) => check.passed).length;
  return {
    ready: passed === checks.length,
    score: `${passed}/${checks.length}`,
    checks
  };
}
