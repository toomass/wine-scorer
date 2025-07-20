import type { Wine, ScoringCriterion } from "../types/wine";
import { getWineStatus, getScoredCriteriaCount } from "../utils/wineUtils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface WineCardProps {
  wine: Wine;
  criteria: ScoringCriterion[];
  onClick: () => void;
}

export function WineCard({ wine, criteria, onClick }: WineCardProps) {
  const status = getWineStatus(wine, criteria);
  const scoredCount = getScoredCriteriaCount(wine);
  const totalCriteria = criteria.length;

  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "bg-green-100 border-green-300 hover:bg-green-50";
      case "partial":
        return "bg-yellow-100 border-yellow-300 hover:bg-yellow-50";
      default:
        return "bg-gray-50 border-gray-200 hover:bg-gray-100";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-500 text-white">Complete</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500 text-white">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${getStatusColor()}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {wine.anonymousId}
          </CardTitle>
          {getStatusBadge()}
        </div>
        <Badge variant="secondary" className="w-fit">
          {wine.category}
        </Badge>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress:</span>
            <span className="font-medium">
              {scoredCount}/{totalCriteria} criteria
            </span>
          </div>

          {status !== "unscored" && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Current Score:</span>
              <span className="font-bold text-lg">{wine.totalScore}</span>
            </div>
          )}

          {status === "complete" && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {status === "partial" && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(scoredCount / totalCriteria) * 100}%` }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
