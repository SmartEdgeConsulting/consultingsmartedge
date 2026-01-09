import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-700 border-amber-200 font-medium"
        >
          Pending
        </Badge>
      );
    case "attended":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 font-medium"
        >
          Attended
        </Badge>
      );
    case "accepted":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 font-medium"
        >
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 font-medium"
        >
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-700 border-gray-200"
        >
          {status}
        </Badge>
      );
  }
};

