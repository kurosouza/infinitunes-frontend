"use client";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Cards,
  Grid,
  Heading,
  Form,
  FormField,
  Image as GrommetImage,
  Page,
  PageContent,
  ResponsiveContext,
  PageHeader,
  Text,
  TextInput,
} from "grommet";
import { Music, CirclePlay, Search as SearchIcon } from "grommet-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Card } from "./../components/Card";
import Image from "next/image";

const fetcher = async (...args) => fetch(...args).then((res) => res.json());

const songsEndpointUrl =
  "http://infinituneapi.codegarage.cloud/infinitune/infinitune/songs";

export default function SearchPage() {
  const [value, setValue] = React.useState();
  const [songs, setSongs] = React.useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(songQuery) {
    const params = new URLSearchParams(searchParams);
    if (songQuery) {
      params.set("q", songQuery);
    } else {
      params.delete("q");
    }
    return `${songsEndpointUrl}?${params.toString()}`;
  }

  return (
    <Page kind="narrow">
      <PageContent gap="medium" margin={{ bottom: "medium" }}>
        <Box margin={{ top: "medium", bottom: "xxsmall" }}>
          <Image
            src="/music-photo.jpg"
            alt="people at a concert"
            width={800}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <PageHeader
          margin={{ top: "xxsmall" }}
          pad={{ top: "xxsmall" }}
          title={
            <Heading level={1} color="brand" margin={{ vertical: "0px" }}>
              infinitunes
            </Heading>
          }
          subtitle="find the music you love."
        ></PageHeader>
        <Form
          onSubmit={async () => {
            console.log("search form submitted.");
            console.log(event);
            let search_url = handleSearch(value);
            console.log("search_url: " + search_url);

            let songs_result = await fetcher(search_url);
            console.log("found songs: ", songs_result);
            setSongs(songs_result.songs);
          }}
        >
          <TextInput
            aria-label="search"
            icon={<SearchIcon />}
            placeholder="Find a song"
            reverse
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="search"
          />
        </Form>
        <Songs songs={songs} />
      </PageContent>
    </Page>
  );
}

const Songs = (props) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box flex overflow="auto">
      <Cards
        columns={!["xsmall", "small"].includes(breakpoint) ? "small" : ["auto"]}
        gap={!["xsmall", "small"].includes(breakpoint) ? "medium" : "small"}
        data={props.songs}
      >
        {(datum) => (
          <Card
            key={datum.id}
            // margin ensures focus on cards is not cutoff
            margin="xxsmall"
            pad="medium"
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert(`
                Typically a click would route to a view with
                greater detail behind this summary information.
              `);
            }}
            icon={
              <Box align="center" direction="row" gap="xsmall">
                <CirclePlay
                  background={datum.status === "Online" ? "brand" : "text-weak"}
                  pad="xsmall"
                  round
                />
                <Text color="text-strong">{datum.status}</Text>
              </Box>
            }
            title={datum.title}
            subtitle={
              <Text color="green" size="xsmall">
                listen on Spotify
              </Text>
            }
            level={4}
          >
            <Box flex justify="end">
              <Text size="small" color="brand">
                Artist
              </Text>
              <Text color="text-strong">{datum.artist}</Text>
            </Box>
          </Card>
        )}
      </Cards>
    </Box>
  );
};
