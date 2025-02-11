import { Skeleton } from "~/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { Profile } from "~/types/profile";

interface ProfileHeaderProps {
  profile: Profile | null;
  isLoading: boolean;
}

export function ProfileHeader({ profile, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <div className="mb-8 flex items-center space-x-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-center space-x-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={profile?.avatar_url ?? undefined} />
        <AvatarFallback>
          {profile?.full_name?.[0] ?? profile?.username?.[0] ?? "?"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">
          {profile?.full_name ?? profile?.username ?? "Anonymous"}
        </h1>
        <p className="text-gray-500">
          {profile?.occupation ?? "No occupation set"}
        </p>
        <p className="text-gray-500">
          {profile?.location ?? "No location set"}
        </p>
      </div>
    </div>
  );
}
