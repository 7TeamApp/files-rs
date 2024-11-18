#!/bin/bash

function run(){
    echo "Run $*"
    eval "$*"
}

function ifComExist() {
    local tester="$1"
    local fnTrue="$2"
    local fnFalse="$3"

    if  command -v $tester &> /dev/null; then
        eval "$fnTrue"
    else
        eval "$fnFalse"
    fi
}

function runApt(){
    if [ "$1" == "install" ]; then
        set -- "install" "${@:2}" "-y"
    fi

    ifComExist "sudo" "run sudo apt $*" "run apt $*"
}

function runApk(){
    if [ "$1" == "install" ]; then
        set -- "add" "${@:2}"
    fi
    ifComExist "sudo" "run sudo apk $*" "run apk $*"
}

function runAptGet(){
    ifComExist "sudo" "run sudo apt-get $*" "run apt-get $*"
}

function runPacketManager() {
    ifComExist "apt" "runApt $*" "runApk $*"
}

runPacketManager "$*"