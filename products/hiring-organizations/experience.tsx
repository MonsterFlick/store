"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { HiringCompany } from "./types";
import { sampleCompanies } from "./sample";
import { ProtectedWatermark } from "@/components/security/ProtectedWatermark";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";
import {
  Search,
  Building2,
  MapPin,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Layers,
  Globe,
  Filter,
  Copy,
  Check,
  Share2,
  SlidersHorizontal,
  X,
  ShieldCheck,
  Info,
  Laptop,
} from "lucide-react";

export interface HiringExperienceProps {
  content?: {
    companies?: HiringCompany[];
  } | HiringCompany[];
  user?: { id?: string; name?: string; email?: string };
  orderId?: string;
  isFreePreview?: boolean;
}

export default function HiringExperience({
  content,
  user,
  orderId,
  isFreePreview = false,
}: HiringExperienceProps) {
  // Extract companies from decrypted content or fallback to dataset
  const allCompanies: HiringCompany[] = useMemo(() => {
    if (content) {
      if (Array.isArray(content)) return content;
      if (Array.isArray(content.companies)) return content.companies;
    }
    return sampleCompanies;
  }, [content]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "location">("name-asc");

  // Selected company for detailed modal
  const [activeCompany, setActiveCompany] = useState<HiringCompany | null>(null);

  // Bookmarks saved in browser localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Notes saved per company in localStorage
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");

  // Load bookmarks & notes from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("om_store_hiring_bookmarks");
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
      const savedNotes = localStorage.getItem("om_store_hiring_notes");
      if (savedNotes) {
        setUserNotes(JSON.parse(savedNotes));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Update current note when active company changes
  useEffect(() => {
    if (activeCompany) {
      setCurrentNote(userNotes[activeCompany.id] || "");
    }
  }, [activeCompany, userNotes]);

  // Toggle bookmark handler
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("om_store_hiring_bookmarks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Save note handler
  const handleSaveNote = () => {
    if (!activeCompany) return;
    const updated = {
      ...userNotes,
      [activeCompany.id]: currentNote,
    };
    setUserNotes(updated);
    try {
      localStorage.setItem("om_store_hiring_notes", JSON.stringify(updated));
    } catch {}
  };

  // Copy interview process to clipboard
  const handleCopyProcess = (company: HiringCompany) => {
    const text = `${company.name} (${company.location})\nCareers: ${company.url}\nHiring Format: ${company.interviewType}\nInterview Process: ${company.interviewProcess}`;
    navigator.clipboard.writeText(text);
    setCopiedId(company.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Sorted Companies
  const filteredCompanies = useMemo(() => {
    return allCompanies
      .filter((c) => {
        // Category Filter
        if (selectedCategory !== "All" && c.category !== selectedCategory) {
          return false;
        }
        // Interview Type Filter
        if (selectedType !== "All" && c.interviewType !== selectedType) {
          return false;
        }
        // Remote Only
        if (onlyRemote && !c.isRemote) {
          return false;
        }
        // Bookmarked Only
        if (onlyBookmarked && !bookmarkedIds.includes(c.id)) {
          return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = c.name.toLowerCase().includes(q);
          const matchLocation = c.location.toLowerCase().includes(q);
          const matchProcess = c.interviewProcess.toLowerCase().includes(q);
          const matchType = c.interviewType.toLowerCase().includes(q);
          return matchName || matchLocation || matchProcess || matchType;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "location") return a.location.localeCompare(b.location);
        return 0;
      });
  }, [
    allCompanies,
    searchQuery,
    selectedCategory,
    selectedType,
    onlyRemote,
    onlyBookmarked,
    bookmarkedIds,
    sortBy,
  ]);

  // Statistics
  const remoteCount = useMemo(() => allCompanies.filter((c) => c.isRemote).length, [allCompanies]);
  const indiaCount = useMemo(() => allCompanies.filter((c) => c.isIndia).length, [allCompanies]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white">
      {/* Dynamic Identity Watermark across the licensed viewport */}
      <ProtectedWatermark
        userName={user?.name}
        userEmail={user?.email}
        orderId={orderId}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[var(--background)]/85 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <Link
              href="/library"
              className="p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
              title="Back to My Library"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight truncate text-[var(--text-primary)]">
                  Companies That Hire Without Whiteboards
                </h1>
                <Badge variant="accent" className="hidden sm:inline-flex text-[10px] uppercase font-mono">
                  Verified Directory
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)] truncate hidden md:block">
                144 companies assessing on real-world engineering, practical take-homes & pairing
              </p>
            </div>
          </div>

          {/* User Status / License Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            {user?.email && (
              <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)] bg-[var(--surface-elevated)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate max-w-[180px]">{user.email}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--accent-primary)] font-semibold">Licensed</span>
              </div>
            )}

            <button
              onClick={() => setOnlyBookmarked((prev) => !prev)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                onlyBookmarked
                  ? "bg-[var(--accent-primary)] text-white border-transparent"
                  : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Total Companies
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {allCompanies.length}
              </span>
              <span className="text-xs text-emerald-500 font-medium">100% Curated</span>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Worldwide Remote
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-500">
                {remoteCount}
              </span>
              <span className="text-xs text-[var(--text-muted)]">Flexible</span>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              India Focus
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-500">
                {indiaCount}
              </span>
              <span className="text-xs text-[var(--text-muted)]">Tech Hubs</span>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Hiring Format
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-500">
                0
              </span>
              <span className="text-xs text-purple-400 font-medium">LeetCode Rounds</span>
            </div>
          </div>
        </div>

        {/* Search & Filtering Toolbar */}
        <div className="p-4 sm:p-5 rounded-[var(--radius-lg)] bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Live Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search by company name, location, or interview keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 text-xs bg-[var(--surface-elevated)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Sort & Remote Toggle */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
              <label className="flex items-center space-x-2 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyRemote}
                  onChange={(e) => setOnlyRemote(e.target.checked)}
                  className="rounded border-[var(--border-subtle)] text-[var(--accent-primary)] focus:ring-0"
                />
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-400" /> Remote Friendly
                </span>
              </label>

              <div className="flex items-center space-x-1.5 text-xs text-[var(--text-muted)] pl-2 border-l border-[var(--border-subtle)]">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="name-asc">Name (A → Z)</option>
                  <option value="name-desc">Name (Z → A)</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase mr-1">
              Category:
            </span>
            {["All", "Worldwide Remote", "India Tech", "India + Remote"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-[var(--accent-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}

            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase ml-auto hidden sm:inline-block">
              {filteredCompanies.length} of {allCompanies.length} matched
            </span>
          </div>

          {/* Interview Type Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase mr-1">
              Method:
            </span>
            {["All", "Take-Home Project", "Practical Discussion", "Pair Programming"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-0.5 rounded-[var(--radius-sm)] text-[11px] font-mono transition-colors border ${
                  selectedType === type
                    ? "bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)] font-semibold"
                    : "bg-transparent text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-[var(--text-secondary)]">
            Showing <strong className="text-[var(--text-primary)]">{filteredCompanies.length}</strong> companies
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedType !== "All" && ` using ${selectedType}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          {(searchQuery || selectedCategory !== "All" || selectedType !== "All" || onlyRemote || onlyBookmarked) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedType("All");
                setOnlyRemote(false);
                setOnlyBookmarked(false);
              }}
              className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        {/* Interactive Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="p-12 text-center rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-3">
            <Building2 className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-50" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">No organizations match your filters</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Try broadening your search term or switching to &ldquo;All Categories&rdquo; to view the complete catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => {
              const isSaved = bookmarkedIds.includes(company.id);

              return (
                <div
                  key={company.id}
                  onClick={() => setActiveCompany(company)}
                  className="group relative p-5 rounded-[var(--radius-lg)] bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Header: Company Name & Actions */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        {/* Interactive Company Name */}
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                            {company.name}
                          </h3>
                          {company.isLive && (
                            <span
                              className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 inline-block"
                              title="Active Verified Careers Page"
                            />
                          )}
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-1.5 text-xs text-[var(--text-muted)]">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{company.location}</span>
                        </div>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(company.id, e)}
                        className={`p-1.5 rounded-full transition-colors ${
                          isSaved
                            ? "text-amber-500 bg-amber-500/10"
                            : "text-[var(--text-muted)] hover:text-amber-500 hover:bg-[var(--surface-elevated)]"
                        }`}
                        title={isSaved ? "Remove from shortlist" : "Bookmark company"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Badges: Category & Format */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px] font-mono py-0 px-2">
                        {company.category}
                      </Badge>

                      <Badge
                        variant={
                          company.interviewType === "Take-Home Project"
                            ? "accent"
                            : company.interviewType === "Pair Programming"
                            ? "success"
                            : "default"
                        }
                        className="text-[10px] font-mono py-0 px-2"
                      >
                        {company.interviewType}
                      </Badge>
                    </div>

                    {/* Interview Process Excerpt */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {company.interviewProcess}
                    </p>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-[var(--accent-primary)] group-hover:underline flex items-center gap-1">
                      Inspect Hiring Method →
                    </span>

                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors inline-flex items-center gap-1"
                      title="Open Careers Website"
                    >
                      <span className="text-[11px]">Careers</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Interactive Company Detail Modal */}
      {activeCompany && (
        <Modal
          isOpen={Boolean(activeCompany)}
          onClose={() => setActiveCompany(null)}
          title={activeCompany.name}
          maxWidth="xl"
        >
          <div className="space-y-6">
            {/* Modal Header Highlights */}
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                      {activeCompany.name}
                    </h2>
                    {activeCompany.isLive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Link
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>{activeCompany.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(activeCompany.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                      bookmarkedIds.includes(activeCompany.id)
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                        : "bg-[var(--background)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>
                      {bookmarkedIds.includes(activeCompany.id) ? "Shortlisted" : "Shortlist"}
                    </span>
                  </button>

                  <a
                    href={activeCompany.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity"
                  >
                    <span>View Careers Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
                <Badge variant="outline" className="text-xs">
                  {activeCompany.category}
                </Badge>
                <Badge variant="accent" className="text-xs">
                  Format: {activeCompany.interviewType}
                </Badge>
                {activeCompany.isRemote && (
                  <Badge variant="success" className="text-xs">
                    Remote-Eligible
                  </Badge>
                )}
                {activeCompany.isIndia && (
                  <Badge variant="secondary" className="text-xs">
                    India Office
                  </Badge>
                )}
              </div>
            </div>

            {/* Complete Interview Process Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Verified Interview Process & Stages
                </h3>

                <button
                  type="button"
                  onClick={() => handleCopyProcess(activeCompany)}
                  className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                >
                  {copiedId === activeCompany.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Process</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)] text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap font-sans">
                {activeCompany.interviewProcess}
              </div>
            </div>

            {/* Strategic Interview Advice for this Format */}
            <div className="p-4 rounded-[var(--radius-md)] bg-blue-500/5 border border-blue-500/20 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-blue-500 font-semibold">
                <Info className="w-4 h-4" />
                <span>Format Strategy: {activeCompany.interviewType}</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {activeCompany.interviewType === "Take-Home Project" &&
                  "Emphasize code readability, sensible directory layout, automated unit tests, and a crystal-clear README explaining your architectural tradeoffs and choices."}
                {activeCompany.interviewType === "Pair Programming" &&
                  "Communicate your thought process out loud. Be receptive to feedback, demonstrate practical debugging skills, and treat the interviewer as a collaborative teammate rather than an examiner."}
                {activeCompany.interviewType === "Practical Discussion" &&
                  "Be prepared to deep-dive into your past production challenges: scaling tradeoffs, system outages, debugging stories, and team collaboration frameworks."}
                {activeCompany.interviewType === "Code Walkthrough" &&
                  "Have a clean personal or open-source repository ready to screen-share. Walk through how you designed data models, handled edge cases, and handled errors."}
              </p>
            </div>

            {/* Personalized Candidate Notes (LocalStorage) */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  My Preparation Notes & Role Tracker
                </label>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Saved automatically on your device
                </span>
              </div>

              <textarea
                rows={3}
                placeholder="Write specific role links, target positions, contact names, or customized resume points for this company..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                onBlur={handleSaveNote}
                className="w-full text-xs p-3 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] leading-relaxed"
              />

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleSaveNote} className="text-xs">
                  <span>Save Notes</span>
                </Button>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCompany(null)}
              >
                <span>Close</span>
              </Button>

              <a
                href={activeCompany.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm">
                  <span>Go to {activeCompany.name} Careers</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
