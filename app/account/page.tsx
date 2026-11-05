import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";
import { clientEnv } from "@/lib/env";
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
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { DeviceManager } from "@/components/account/DeviceManager";

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-IN", {
      dateStyle: "medium",
    });
  } catch {
    return "Recent";
  }
}

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

  const initialLetter = (
    currentUser.user_metadata?.full_name ||
    currentUser.email ||
    "U"
  )[0].toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-zinc-950 dark:text-white relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="kr-orb w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] -top-24 left-1/4 -translate-x-1/2 bg-indigo-500/10 dark:bg-indigo-600/15" />
      <div className="kr-grid-bg absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 flex-1 w-full space-y-10 relative z-10">
        {/* Account Profile Card */}
        <section className="rounded-2xl glass-card-interactive p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl border border-indigo-200 dark:border-indigo-500/20 shadow-xs">
              {initialLetter}
            </div>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
                {currentUser.user_metadata?.full_name || "Account Profile"}
              </h1>
              <p className="text-xs text-zinc-500 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/library">
              <Button variant="glass" size="sm">
                <BookOpen className="w-4 h-4 mr-1.5 text-indigo-500" />
                <span>My Library</span>
              </Button>
            </Link>

            <form action="/api/auth/signout" method="POST">
              <Button variant="outline" size="sm" type="submit" className="border-black/[0.08] dark:border-white/10">
                <LogOut className="w-4 h-4 mr-1.5" />
                <span>Sign Out</span>
              </Button>
            </form>
          </div>
        </section>

        {/* Active Devices (2-Device Policy) */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 font-display">
              <Smartphone className="w-5 h-5 text-indigo-500" />
              <span>Connected Reading Devices</span>
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Read seamlessly across devices. You can view or revoke active browser sessions below:
            </p>
          </div>

          <DeviceManager initialDevices={devices || []} userId={currentUser.id} />
        </section>

        {/* Purchase History & Receipts */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 font-display">
              <Receipt className="w-5 h-5 text-indigo-500" />
              <span>Purchase History & Receipts</span>
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Permanent record of your digital transactions and lifetime access.
            </p>
          </div>

          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 rounded-2xl glass-card-interactive">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-black/[0.06] dark:border-white/10 gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-zinc-500">
                          Order #{order.id.substring(0, 8)}
                        </span>
                        <Badge
                          variant={order.status === "paid" ? "success" : "default"}
                        >
                          {(order.status || "PENDING").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">
                        Purchased on {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-bold font-mono">
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
                          <span className="font-medium text-zinc-950 dark:text-white">
                            {item.products?.name || "Digital Product"}
                          </span>
                          <span className="text-xs text-zinc-500 block">
                            Lifetime Access Included
                          </span>
                        </div>
                        {item.products?.slug && (
                          <Link href={`/library/${item.products.slug}`}>
                            <Button size="sm" variant="glass">
                              <span>Open</span>
                              <ExternalLink className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl glass-panel space-y-3">
              <p className="text-sm text-zinc-500">
                You haven&apos;t purchased any products yet.
              </p>
              <Link href="/#catalog">
                <Button size="sm" variant="primary">
                  Explore Publications
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Security & Support / Deletion Info */}
        <section className="pt-6 border-t border-black/[0.06] dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-card-interactive space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-zinc-950 dark:text-white font-display">
              <Shield className="w-4 h-4 text-emerald-500" />
              Purchase Protection & Access
            </h3>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
              <p>
                Your purchases are permanently linked to your verified account with unlimited lifetime access.
              </p>
              <p>
                Enjoy instant reading across your devices, with all future revisions and updates included at no extra charge.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card-interactive space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-zinc-950 dark:text-white font-display">
              <Mail className="w-4 h-4 text-indigo-500" />
              Support & Inquiries
            </h3>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
              <p>
                Need assistance with your orders, billing receipts, or device access? Reach out directly to our team.
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${clientEnv.NEXT_PUBLIC_SUPPORT_EMAIL || "sowebuild.in@gmail.com"}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono"
                >
                  {clientEnv.NEXT_PUBLIC_SUPPORT_EMAIL || "sowebuild.in@gmail.com"}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
