<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Setup writable /tmp directory structure for Vercel serverless environment
$dirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/storage/app/public',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// Copy initial SQLite database with seed data to writable /tmp if exists
if (!file_exists('/tmp/database.sqlite') && file_exists(__DIR__ . '/../database/database.sqlite')) {
    @copy(__DIR__ . '/../database/database.sqlite', '/tmp/database.sqlite');
}

// Guard default environment variables against empty strings from Vercel UI
$defaultEnvs = [
    'DB_CONNECTION' => 'sqlite',
    'DB_DATABASE' => '/tmp/database.sqlite',
    'VIEW_COMPILED_PATH' => '/tmp/storage/framework/views',
    'SESSION_DRIVER' => 'cookie',
    'CACHE_STORE' => 'array',
    'CACHE_DRIVER' => 'array',
    'QUEUE_CONNECTION' => 'sync',
    'FILESYSTEM_DISK' => 'local',
    'LOG_CHANNEL' => 'stderr',
    'APP_MAINTENANCE_DRIVER' => 'file',
    'APP_MAINTENANCE_STORE' => 'cache',
    'BCRYPT_ROUNDS' => '12',
];

foreach ($defaultEnvs as $key => $val) {
    if (empty(getenv($key))) {
        putenv("{$key}={$val}");
        $_ENV[$key] = $val;
        $_SERVER[$key] = $val;
    }
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel...
/** @var Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Route all storage operations to /tmp in Vercel
$app->useStoragePath('/tmp/storage');

// Handle the incoming request
$app->handleRequest(Request::capture());
