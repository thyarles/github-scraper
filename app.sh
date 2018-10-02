#!/bin/bash

RESTORE='\033[0m'
GREEN='\033[00;32m'

function help {
  clear
  echo -e "${GREEN}help${RESTORE} -> Imprime o help com os comandos disponíveis"
  echo -e ""
  echo -e "${GREEN}deploy${RESTORE} -> Faz o deploy da aplicação"
  echo -e ""
  echo -e "${GREEN}test${RESTORE} -> Roda os testes da aplicação"
  echo -e ""
  echo -e "${GREEN}lint${RESTORE} -> Roda o eslint na aplicação"
  echo -e ""
}

help
