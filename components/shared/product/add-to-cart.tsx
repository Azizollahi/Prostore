'use client';
import { Plus, Minus, Loader } from "lucide-react";

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = async () => {
        startTransition(async () => {
            // Call action
            const response = await addItemToCart(item);

            if (!response.success) {
                toast({
                    variant: 'destructive',
                    description: response.message
                });
                return;
            }

            // handle success add to cart
            toast({
                description: response.message,
                action: (
                    <ToastAction className='bg-primary text-white dark:text-gray-800 dark:hover:text-white hover:bg-gray-800'
                        altText='Go To Cart' onClick={() => router.push('/cart')}>
                        Go To Cart
                    </ToastAction>
                )
            });
        });
    };

    // Handle Remove from cart
    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            // Call action
            const response = await removeItemFromCart(item.productId);

            toast({
                variant: response?.success ? 'default' : 'destructive',
                description: response?.message
            });
        });
    }

    // Check of item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button type='button' variant='outline' onClick=
                {handleRemoveFromCart}>
                {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type='button' variant='outline' onClick=
                {handleAddToCart}>
                {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button >
        </div>
    ) : (
        <Button className='w-full' type='button' onClick=
            {handleAddToCart}>
            {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}AddToCart
        </Button >
    )
}

export default AddToCart