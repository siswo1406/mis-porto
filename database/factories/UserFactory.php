<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jabatan = \App\Models\Jabatan::inRandomOrder()->first()?->nama;
        $region = \App\Models\Region::inRandomOrder()->first()?->koderegion;
        $unit = \App\Models\Unit::where('region', $region)->inRandomOrder()->first()?->kodeunit;
        
        $name = fake()->name();
        $firstName = explode(' ', $name)[0];
        $lastName = explode(' ', $name)[1] ?? '';
        $emailPrefix = strtolower(preg_replace('/[^a-zA-Z]/', '', $firstName . '.' . $lastName));
        
        $nik = fake()->numberBetween(1970, 2005) . '.MTK.' . fake()->unique()->numberBetween(1000, 9999);

        return [
            'name' => strtoupper($name),
            'nik' => $nik,
            'email' => $emailPrefix . '@ptmjl.co.id',
            'region' => $region,
            'unit' => $unit,
            'jabatan' => $jabatan,
            'roles' => 'USER',
            'nowa' => '08' . fake()->numberBetween(111111111, 999999999),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('Mustika@2026'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
