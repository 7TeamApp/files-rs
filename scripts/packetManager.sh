#!/bin/bash

function run(){
    echo "Run $@"
    $@
}

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

function runApt(){
    ifComExist "sudo" "run sudo apt $@" "run apt $@"
}

function runApk(){
    ifComExist "sudo" "run sudo apk $@" "run apk $@"
}

function runPacketManager() {
    ifComExist "apt" "runApt $@" "runApk $@"
}

runPacketManager "$@"