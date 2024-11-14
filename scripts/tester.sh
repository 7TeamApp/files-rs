#!/bin/bash

function ifComExist() {
    local tester="$1"
    local fnTrue="$2"
    local fnFalse="$3"

    if $tester --help &> /dev/null; then
        $fnTrue
    else
        $fnFalse
    fi
}

function runBun() {
    ifComExist "bun" "runBunTest" "runDeno"
}

function runDeno(){
    ifComExist "deno" "runDenoVitest" "runNpxVitest"
}

function runBunTest() {
    echo "using bun with bun:test"
    bun test .ts
}

function runDenoVitest(){
    echo "using deno with vitest"
    deno task test

function runNpxVitest() {
    echo "using npx with vitest"
    npx vitest run -r test
}

function runNpxJest() {
    echo "using npx with jest"
    npx jest --all --rootDir test_dist --testMatch '**/*.cjs'
}

runBun