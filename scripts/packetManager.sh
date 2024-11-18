#!/bin/bash

function run(){
    echo "Run $@"
    eval "$@"
}

function ifComExist() {
    local tester="$1"
    local fnTrue="$2"
    local fnFalse="$3"

    echo "$fnTrue"
    echo "$fnFalse"

    if  command -v $tester &> /dev/null; then
        eval "$fnTrue"
    else
        eval "$fnFalse"
    fi
}

function runApt(){
    echo "you are here 1"
    echo "$@"
    ifComExist "sudo" "run sudo apt $@" "run apt $@"
}

function runApk(){
    echo "you are here 2"
    echo "$@"
    ifComExist "sudo" "run sudo apk $@" "run apk $@"
}

function runAptGet(){
    ifComExist "sudo" "run sudo apt-get $@" "run apt-get $@"
}

function runPacketManager() {
    echo "$@"
    ifComExist "apt" "runApt $@" "runApk $@"
}

echo "$@"
runPacketManager "$@"