import { Button, Container, Flex, Text, HStack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { MdDarkMode, MdBrightness1 } from "react-icons/md";

function Navbar(){
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <Container maxW={'100vw'} px={4}>
            <Flex 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Text
                    bgGradient={"linear(to-r, cyan, blue)"}
                    bgClip='text'
                    fontSize={{base: "32", sm: "38"}}
                    textAlign={"center"}
                    textTransform={"uppercase"}

                    fontWeight={'bold'}
                >
                    <Link to={"/"}>Product Store</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MdDarkMode size={20} /> : <MdBrightness1 size={20} />}
                    </Button>
                </HStack>
                
                
            </Flex>
        </Container>
    );
}

export default Navbar