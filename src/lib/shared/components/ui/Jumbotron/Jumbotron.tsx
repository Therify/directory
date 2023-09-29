interface JumbotronProps {
  hasRecommendationsForReview: boolean;
  hasStartedCare: boolean;
}

export function Jumbotron({hasStartedCare, hasRecommendationsForReview}: JumbotronProps) {
  if (hasRecommendationsForReview) return <>Get it boi</>
  if (!hasStartedCare) return <>Build your Care Team...</>
  return <>Get Matched</>
}
