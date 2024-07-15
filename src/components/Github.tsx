import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Image from "next/image";
import { Component } from "./language-card";

export default async function Github() {
    let languages: any = []

    let githubUrl = await fetch('https://api.github.com/users/aniruddha76')
    let userData = await githubUrl.json()

    let repos = await fetch(userData.repos_url + "?per_page=1000")
    let reposdata = await repos.json()

    reposdata.forEach((repo: { language: unknown; }) => {
        if (repo.language != null) {
            languages.push(repo.language)
        }
    });

    const Skeleton = () => (
        <Image
            src={userData.avatar_url}
            alt="Github Profile"
            height={400}
            width={400}
        />
    );

    const countOccurrences: {[key: string]: number} = {};

    // Iterate through the array
    languages.forEach((element: string) => {
        // If the element is already in the object, increment its count
        if (countOccurrences[element]) {
            countOccurrences[element]++;
        } else {
            // If the element is not in the object, add it with a count of 1
            countOccurrences[element] = 1;
        }
    });

    const items = [
        {
            title: userData.name,
            description: userData.bio,
        },
        {
            title: "About Me",
            description: "Dive into the transformative power of technology.Dive into the transformative power of technology.Dive into the transformative power of technology.Dive into the transformative power of technology.Dive into the transformative power of technology.Dive into the transformative power of technology.",
            // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        },
        {
            header: <Skeleton />,
        },
        {
            title: "Top Languages",
            description: <Component languages={countOccurrences} />
            // icon: <IconHtml className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Since",
            description: userData.created_at,
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    // icon={item.icon}
                    className={
                        i === 0 ? "md:col-span-2" :
                            i === 1 ? "md:row-span-2" :
                                i === 2 ? "md:row-span-3 md:col-span-2" : ''
                    }
                />
            ))}
        </BentoGrid>
    )
}