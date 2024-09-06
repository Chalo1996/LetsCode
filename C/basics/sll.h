#ifndef SLL_H_INCLUDED
#define SLL_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>

/* structure */
typedef struct Node {
    int data;
    struct Node *nextNode;
} SLL_Node;

/* macros */
SLL_Node *insertAtHead(SLL_Node *headptr, int data);
void Print(SLL_Node *head);
void Clean(SLL_Node *head);

#endif // SLL_H_INCLUDED
