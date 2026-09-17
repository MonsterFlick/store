"use client";

import React, { useState } from "react";
import { Laptop, Smartphone, Trash2, CheckCircle2 } from "lucide-react";
import { UserDevice } from "@/lib/security/devices";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface DeviceManagerProps {
  initialDevices: UserDevice[];
  userId: string;
}

export function DeviceManager({ initialDevices }: DeviceManagerProps) {
  const [devices, setDevices] = useState<UserDevice[]>(initialDevices);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRevoke = async (deviceId: string) => {
    setRevokingId(deviceId);
    setMessage(null);

    try {
      const res = await fetch("/api/account/devices/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });

      if (res.ok) {
        setDevices((prev) => prev.filter((d) => d.id !== deviceId));
        setMessage("Device successfully revoked. You can now connect a new device.");
      }
    } catch {
      // ignore
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-[var(--status-success)] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {devices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {devices.map((device, index) => {
            const isPhone = /android|ios|iphone|ipad/i.test(device.device_name);
            return (
              <Card key={device.id || index} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--background-secondary)] text-[var(--accent-primary)]">
                    {isPhone ? (
                      <Smartphone className="w-5 h-5" />
                    ) : (
                      <Laptop className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{device.device_name}</h4>
                    <p className="text-xs text-[var(--text-muted)]">
                      Last seen:{" "}
                      {new Date(device.last_seen_at).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  isLoading={revokingId === device.id}
                  onClick={() => handleRevoke(device.id)}
                  className="text-xs text-red-500 hover:text-red-600 hover:border-red-500/30"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>Revoke</span>
                </Button>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-6">
          <p className="text-xs text-[var(--text-muted)]">
            No external devices registered. The device you are currently browsing on is automatically counted upon reading.
          </p>
        </Card>
      )}
    </div>
  );
}
