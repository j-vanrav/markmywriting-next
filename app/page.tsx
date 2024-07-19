"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ComposePage from "@/components/compose-page";
import ReviewPage from "@/components/review-page";
import ProfilePage from "@/components/profile-page";
import Nav from "@/components/nav";

const getPageIndex = (page: PageName): number =>
  page === "review" ? 0 : page === "compose" ? 1 : 2;
const getIndexPage = (index: number): PageName =>
  index === 0 ? "review" : index === 1 ? "compose" : "profile";

export default function Main() {
  const [miniatureNav, setMiniatureNav] = useState(false);
  const [selectedPage, setSelectedPage] = useState("compose" as PageName);
  const selectedPageIndex = getPageIndex(selectedPage);
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setSelectedPage(getIndexPage(api.selectedScrollSnap()));

    api.on("select", () => {
      setSelectedPage(getIndexPage(api.selectedScrollSnap()));
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    if (api.selectedScrollSnap() !== selectedPageIndex) {
      setMiniatureNav(false);
      api?.scrollTo(selectedPageIndex);
    }
  }, [api, selectedPageIndex]);

  return (
    <main
      className={cn(
        "flex flex-col w-screen h-screen bg-nbbgblue text-black overflow-hidden"
      )}
    >
      <Carousel
        setApi={setApi}
        opts={{ startIndex: 1 }}
        className="w-full h-full"
      >
        <CarouselContent className="w-screen h-screen m-0">
          <CarouselItem className="relative w-full h-full">
            <AnimatePresence>
              {selectedPage === "review" && (
                <ReviewPage
                  className={cn("absolute left-0 right-0 top-0 bottom-0")}
                  disabled={selectedPage !== "review"}
                  setMiniatureNav={setMiniatureNav}
                />
              )}
            </AnimatePresence>
          </CarouselItem>

          <CarouselItem className="relative w-full h-full">
            <AnimatePresence>
              {selectedPage === "compose" && (
                <ComposePage
                  className={cn("absolute left-0 right-0 top-0 bottom-0")}
                  disabled={selectedPage !== "compose"}
                  setMiniatureNav={setMiniatureNav}
                />
              )}
            </AnimatePresence>
          </CarouselItem>

          <CarouselItem className="relative w-full h-full">
            <AnimatePresence>
              {selectedPage === "profile" && (
                <ProfilePage
                  className={cn("absolute left-0 right-0 top-0 bottom-0")}
                  disabled={selectedPage !== "profile"}
                />
              )}
            </AnimatePresence>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div
        className={cn(
          "fixed bottom-0 left-4 right-4 z-40 bg-black rounded-t-2xl transition-all",
          miniatureNav ? "h-11" : "h-14"
        )}
      />
      <Nav
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        miniature={miniatureNav}
      />
    </main>
  );
}
