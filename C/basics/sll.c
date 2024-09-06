#include "hello.h"

SLL_Node *getNode(int data) {
    SLL_Node *node = (SLL_Node *)malloc(sizeof(SLL_Node));
    node->data = data;
    node->nextNode = NULL;

    return node;
}

SLL_Node *insertAtHead(SLL_Node *headptr, int data) {
    SLL_Node *node = getNode(data);
    node->nextNode = headptr;
    headptr = node;

    return headptr;
}

void Print(SLL_Node *head) {
    printf("Start::");
    while(head != NULL) {
        printf("%d", head->data);
        if (head->nextNode != NULL) {
            printf(" -> ");
        }
        head = head->nextNode;
    }
    printf("::End\n");
}

void Clean(SLL_Node *head) {
    while (head != NULL) {
        SLL_Node *current = head;
        head = head->nextNode;
        free(current);
    }
}
