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

function runApt(){
    apt "$@"
}

function runApk(){
    apk "$@"
}

function runPacketManager() {
    ifComExist "apt" "runApt \"$@\"" "runApk \"$@\""
}

runPacketManager "$@"