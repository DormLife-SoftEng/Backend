#!/bin/bash
if [ -z "$1"  ]; then
    echo "Empty Argument. Aborting."
    exit 1;
fi
if [ -z "$2" ]; then
    echo "Empty Argument. Aborting."
    exit 1;
fi
echo "Syncing $1 <-> $2 $3 ..."
git fetch origin
git checkout $1
git pull
sleep 0.5
echo "Committing 2 ways rebase ..."
echo "Syncing $1 -> $2 ..."
git checkout $2
git rebase $1
sleep 0.5
echo "Syncing $1 <- $2 ..."
git checkout $1
git rebase $2
echo "Done"