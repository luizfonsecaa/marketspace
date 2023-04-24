import {
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Button } from "../Button";
import { ArrowArcLeft, ArrowLeft, Plus } from "phosphor-react-native";
import { Basic } from "./Basic";
import { Normal } from "./Normal";
import { Preview } from "./Preview";

type Props = {
  type?: "normal" | "basic" | "preview" | "edit";
  name?: string;
};

export function Header({ type = "normal", name }: Props) {
  return (
    <>
      {type == "normal" ? (
        <Normal />
      ) : type == "preview" ? (
        <Preview />
      ) : (
        <Basic name={name as string} />
      )}
    </>
  );
}
