<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NftCollection>
 */
class NftCollectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $crypto_currencies = [
            'Bitcoin', 'Ethereum', 'Ripple', 'Litecoin', 'Cardano', 
            'Polkadot', 'Bitcoin Cash', 'Stellar', 'Chainlink', 
            'Binance Coin', 'Monero', 'Tron', 'EOS', 'Dash', 'Neo', 
            'Tezos', 'Cosmos', 'VeChain', 'Tether', 'USD Coin', 'Dogecoin', 
            'Zcash', 'Maker', 'Uniswap', 'Compound', 'Aave', 'Synthetix', 
            'Yearn.finance', 'Polygon', 'SushiSwap', 'Filecoin', 'Theta', 
            'Algorand', 'Enjin Coin', 'Basic Attention Token', 'Decred', 
            'NEM', 'Qtum', 'Waves', 'Horizen', 'Icon', 'OMG Network', 'Ren', 
            'Kyber Network', '0x', 'Golem', 'Augur', 'Dai'
        ];

        return [
            'name' => $this->faker->word(), 
            'description' => $this->faker->sentence(),
            'price' => $this->faker->numberBetween($min = 1000, $max = 50000),
            'crypto_currency' => $this->faker->randomElement($crypto_currencies),
            'user_prodaje_id' => User::factory(),
            'user_kupuje_id' => User::factory(),
        ];
    }
}
