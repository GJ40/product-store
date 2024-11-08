import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/products";

function CreatePage(){

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const toast = useToast();
    const { createProduct } = useProductStore();
    const handleAddProduct = async() => {
        const {success, message} = await createProduct(newProduct);
        //console.log("Success: ", success);
        //console.log("Message: ", message);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        }
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
        setNewProduct({name: "", price: "", image: ""});
    }

    return(
        <Container maxW={"container.sm"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4} >
                        <Input 
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(event) => setNewProduct({...newProduct, name: event.target.value})}
                        />
                        <Input 
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(event) => setNewProduct({...newProduct, price: event.target.value})}
                        />
                        <Input 
                            placeholder='Image Url'
                            name='image'
                            value={newProduct.image}
                            onChange={(event) => setNewProduct({...newProduct, image: event.target.value})}
                        />
                        <Button colorScheme='blue' onClick={handleAddProduct} w='full' >Add Product</Button>
                    </VStack>

                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage