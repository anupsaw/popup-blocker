#!/usr/bin/bash

ORG_MSG="I am trying to test something good"
ORG_COUNT=$(cat githooks/aks-commit.couter)

CURR_COUNT=$((ORG_COUNT + 1))
echo $CURR_COUNT >githooks/aks-commit.couter

while ((${#CURR_COUNT} < 6)); do
    CURR_COUNT="0$CURR_COUNT"
done

AMEND_COMMIT_MSG="AKS-$CURR_COUNT: $ORG_MSG"
echo $AMEND_COMMIT_MSG
