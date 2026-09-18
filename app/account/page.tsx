import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";
import { env } from "@/lib/env";
import {
  User,
  Shield,
  Smartphone,
  Receipt,
  Mail,
  LogOut,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DeviceManager } from "@/components/account/DeviceManager";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  const currentUser = user;

  // 1. Fetch user orders
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total,
      currency,
      created_at,
      razorpay_order_id,
      order_items (
        id,
        unit_price,
        final_price,
        products (
          id,
          slug,
          name,
          product_type
        )
      )
    `)
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  // 2. Fetch active devices
  const { data: devices } = await supabase
    .from("user_devices")
    .select("*")
    .eq("user_id", currentUser.id)
    .is("revoked_at", null)
    .order("last_seen_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Account Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center font-bold text-lg border border-[var(--accent-primary)]/20">
              {(currentUser.user_metadata?.full_name || currentUser.email || "U")[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {currentUser.user_metadata?.full_name || "Account"}
              </h1>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/library">
              <Button variant="secondary" size="sm">
                <BookOpen className="w-4 h-4 mr-1.5" />
                <span>My Library</span>
              </Button>
            </Link>

            <form action="/api/auth/signout" method="POST">
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="w-4 h-4 mr-1.5" />
                <span>Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Active Devices (2-Device Policy) */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[var(--accent-primary)]" />
              <span>Active Devices (Limit: 2)</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Your account allows up to two active reading devices simultaneously. Revoking an older device allows you to connect a new one.
            </p>
          </div>

          <DeviceManager initialDevices={devices || []} userId={currentUser.id} />
        </section>

        {/* Purchase History & Receipts */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[var(--accent-primary)]" />
              <span>Purchase History & Receipts</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Permanent record of your digital transactions and lifetime access entitlements.
            </p>
          </div>

          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)] gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          Order #{order.id.substring(0, 8)}
                        </span>
                        <Badge
                          variant={order.status === "paid" ? "success" : "default"}
                        >
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Purchased on{" "}
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          dateStyle: "medium",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-bold">
                        {formatINR(Number(order.total))}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="space-y-3">
                    {order.order_items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="space-y-0.5">
                          <span className="font-medium text-[var(--text-primary)]">
                            {item.products?.name || "Digital Product"}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] block">
                            Lifetime Access Entitlement
                          </span>
                        </div>
                        {item.products?.slug && (
                          <Link href={`/library/${item.products.slug}`}>
                            <Button size="sm" variant="secondary">
                              <span>Open</span>
                              <ExternalLink className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-10">
              <p className="text-sm text-[var(--text-muted)] mb-3">
                You haven&apos;t purchased any products yet.
              </p>
              <Link href="/#products">
                <Button size="sm" variant="primary">
                  Explore Products
                </Button>
              </Link>
            </Card>
          )}
        </section>

        {/* Security & Support / Deletion Info */}
        <section className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Security & Content Integrity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-[var(--text-secondary)] space-y-2">
              <p>
                Every product you open is cryptographically watermarked with your purchaser identity (Name, Email, Order #) to safeguard licensed distribution.
              </p>
              <p>
                Structured content is encrypted at rest and delivered strictly through authenticated server-side decrypt pipelines.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                Support & Account Removal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-[var(--text-secondary)] space-y-2">
              <p>
                Need help with your account, order access, or billing questions? Reach our support team anytime at:
              </p>
              <a
                href={`mailto:${env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                className="font-mono text-[var(--accent-primary)] hover:underline font-semibold block"
              >
                {env.NEXT_PUBLIC_SUPPORT_EMAIL}
              </a>
              <p className="text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                To request permanent account deletion and data pruning, please email us directly with your account email address.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
