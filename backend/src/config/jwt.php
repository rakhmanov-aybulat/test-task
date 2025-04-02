<?php
use Firebase\JWT\JWT;

define('JWT_SECRET', getenv('JWT_SECRET'));
define('JWT_ALGORITHM', 'HS256');


