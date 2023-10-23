<script lang="ts">
import MasterCard from "$lib/assets/payment-method/mastercard.png";
import Visa from "$lib/assets/payment-method/visa.png";
import Paypal from "$lib/assets/payment-method/paypal.png";
</script>

<div class="flex flex-row justify-center items-center gap-2">
    <img
        class="h-[30px] object-contain"
        src={Paypal}
        alt="logo of PayPal"
    />
    <img
        class="h-[30px] object-contain"
        src={MasterCard}
        alt="logo of MasterCard"
    />
    <img
        class="h-[30px] object-contain"
        src={Visa}
        alt="logo of Visa"
    />
</div>