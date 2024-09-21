import { Box, Button, Input, Image, Heading, Text, HStack, VStack, IconButton, useColorModeValue, Modal, ModalBody, ModalFooter, useDisclosure, ModalCloseButton, ModalOverlay, ModalHeader, useToast, ModalContent } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/products';
import { useState } from 'react';

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const toast = useToast();

    const handleToast = (success, message) => {
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
    }

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        handleToast(success, message);
    }
    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success, message } = await updateProduct(pid, updatedProduct);
        handleToast(success, message);
        if(success){
            onClose();
        }
    }

    const [ updatedProduct, setUpdatedProduct ] = useState(product);

    return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform: "translateY(-5px)", shadow: 'xl'}}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={4} >
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4} >
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack spacing={4} >
                        <Input 
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(event) => setUpdatedProduct({...updatedProduct, name: event.target.value})}
                        />
                        <Input 
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(event) => setUpdatedProduct({...updatedProduct, price: event.target.value})}
                        />
                        <Input 
                            placeholder='Image Url'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(event) => setUpdatedProduct({...updatedProduct, image: event.target.value})}
                        />
                        
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)} 
                    >Update</Button>
                    <Button variant='ghost' onClick={onClose} >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  );
}

export default ProductCard