import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useProductStore } from "../store/products";
import ProductCard from "../components/ProductCard.jsx";


function HomePage(){

    const { fetchProducts, products } =  useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    //console.log(products);

    

    return(
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
            <Text
                    bgGradient={"linear(to-r, cyan, blue)"}
                    bgClip='text'
                    fontSize={{base: "22", sm: "28"}}
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    fontWeight={'bold'}
                >
                    Current Products
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        sm: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500' >
                        No Products Found{" "}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}} >
                                Create a Product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
}

export default HomePage