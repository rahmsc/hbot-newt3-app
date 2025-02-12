"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ProfileForm } from "~/components/profile/profile-form";
import { SavedArticles } from "~/components/profile/saved-articles";
import type { Profile } from "~/types/profile";

interface ProfileTabsProps {
  profile: Profile;
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Profile Details</TabsTrigger>
        <TabsTrigger value="research">Saved Research</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ProfileForm profile={profile} />
      </TabsContent>
      <TabsContent value="research">
        <SavedArticles userId={profile.id} />
      </TabsContent>
    </Tabs>
  );
}
