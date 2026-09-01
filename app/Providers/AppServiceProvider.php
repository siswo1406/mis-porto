<?php

namespace App\Providers;

use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (app()->environment('production') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')) {
            URL::forceScheme('https');
        }

        Hash::extend('bcrypt', function () {
            return new class extends BcryptHasher {
                public function make(#[\SensitiveParameter] $value, array $options = [])
                {
                    try {
                        return parent::make($value, $options);
                    } catch (\Throwable) {
                        $cost = $this->cost($options);
                        $salt = sprintf('$2y$%02d$', $cost) . substr(str_replace('+', '.', base64_encode(random_bytes(16))), 0, 22);
                        $hash = crypt($value, $salt);
                        if (strlen($hash) > 13) {
                            return $hash;
                        }
                        return password_hash($value, PASSWORD_DEFAULT);
                    }
                }

                public function check(#[\SensitiveParameter] $value, $hashedValue, array $options = [])
                {
                    if (is_null($hashedValue) || (string) $hashedValue === '') {
                        return false;
                    }

                    try {
                        if (password_verify($value, $hashedValue)) {
                            return true;
                        }
                    } catch (\Throwable) {
                        // ignore and try crypt fallback
                    }

                    return hash_equals($hashedValue, (string) crypt($value, $hashedValue));
                }

                public function needsRehash($hashedValue, array $options = [])
                {
                    return false;
                }
            };
        });
    }
}
