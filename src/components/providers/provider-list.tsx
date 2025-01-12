import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function ProviderList() {
  // TODO: Replace with actual provider data and filtering logic
  const providers = [
    {
      id: "1",
      name: "Wellness Center A",
      services: ["Hyperbaric Oxygen", "IV Therapy"],
      address: "123 Main St, City",
      distance: 2.5,
    },
    // Add more mock providers...
  ];

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <CardTitle>{provider.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {provider.address}
              </p>
              <p className="text-sm">
                Services: {provider.services.join(", ")}
              </p>
              <p className="text-sm">Distance: {provider.distance} km</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
