<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default hash driver that gets used while
    | hashing passwords for your application. By default, the bcrypt algorithm
    | is used; however, you are free to change this option if you wish.
    |
    | Supported: "bcrypt", "argon", "argon2id"
    |
    */

    'driver' => 'bcrypt',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options for when the bcrypt
    | algorithm is used. The "rounds" option controls how much time is
    | needed to hash a password. Higher values will increase performance cost.
    |
    */

    'bcrypt' => [
        'rounds' => (int) (env('BCRYPT_ROUNDS') ?: 12),
        'verify' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options for when the Argon
    | algorithm is used. The "memory" option controls the memory limit,
    | while "threads" and "time" control CPU performance costs.
    |
    */

    'argon' => [
        'memory' => 65536,
        'threads' => 1,
        'time' => 4,
        'verify' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Rehash Passwords On Login
    |--------------------------------------------------------------------------
    |
    | When set to true, passwords will be rehashed during authentication if
    | the algorithm work factor has changed since the password was last
    | hashed.
    |
    */

    'rehash_on_login' => false,

];
