"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Database, Profile } from "types/database";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";

interface ProfileFormProps {
  profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [formData, setFormData] = useState<Partial<Profile>>(profile ?? {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData({
      ...formData,
      notification_preferences: {
        ...formData.notification_preferences,
        [name]: checked,
      },
    } as Partial<Profile>);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      theme_preference: e.target.value as "light" | "dark" | "system",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("profiles").upsert({
      id: profile?.id,
      ...formData,
    });

    if (error) {
      console.error("Error updating profile:", error);
      // Handle error, maybe show an error message to the user
    } else {
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio ?? ""}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            name="occupation"
            value={formData.occupation ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="twitter_url">Twitter URL</Label>
          <Input
            id="twitter_url"
            name="twitter_url"
            type="url"
            value={formData.twitter_url ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            value={formData.linkedin_url ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            value={formData.github_url ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="email_notifications"
            checked={formData.notification_preferences?.email ?? false}
            onCheckedChange={handleSwitchChange("email")}
          />
          <Label htmlFor="email_notifications">Email Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="push_notifications"
            checked={formData.notification_preferences?.push ?? false}
            onCheckedChange={handleSwitchChange("push")}
          />
          <Label htmlFor="push_notifications">Push Notifications</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="theme_preference">Theme Preference</Label>
        <select
          id="theme_preference"
          name="theme_preference"
          value={formData.theme_preference ?? "system"}
          onChange={handleThemeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
