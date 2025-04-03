"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ProfileForm } from "~/components/profile/profile-form";
import { SavedResearch } from "~/components/profile/saved-research";
import { SavedTrending } from "~/components/profile/saved-trending";
import type { Profile } from "~/types/profile";

interface ProfileTabsProps {
  profile: Profile;
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Profile Details</TabsTrigger>
        <TabsTrigger value="research">Saved Research</TabsTrigger>
        <TabsTrigger value="trending">Saved Trending</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ProfileForm profile={profile} />
      </TabsContent>
      <TabsContent value="research">
        <SavedResearch userId={profile.id} />
      </TabsContent>
      <TabsContent value="trending">
        <SavedTrending userId={profile.id} />
      </TabsContent>
    </Tabs>
  );
}
