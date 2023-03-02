import React, { useState, useEffect, useMemo } from "react";
import { Stack } from "@chakra-ui/react";
import AnnouncementTile from "../../components/ui/AnnouncementTile";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";

export default function Announcements({ refId }) {
  const [announcement, setAnnouncement] = useState([]);

  const AnnouncementData = () => {
    const collectionRef = collection(db, "announcements");
    const establishmentRef = query(
      collectionRef,
      where("establishment", "==", refId)
    );
    onSnapshot(establishmentRef, (snapshot) => {
      let announcementData = [];
      snapshot.docs.forEach((doc) => {
        announcementData.push({ ...doc.data(), id: doc.id });
      });
      setAnnouncement(announcementData);
    });
  };
  useEffect(() => {
    AnnouncementData();
  }, []);
  const tiles = useMemo(() => {
    return announcement.map(
      (announcement) => <AnnouncementTile announcement={announcement} />,
      [announcement]
    );
  });
  return <Stack>{tiles}</Stack>;
}
