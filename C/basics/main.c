#include "hello.h"

int main() {
    SLL_Node *head = NULL;

    head = insertAtHead(head, 1);
    head = insertAtHead(head, 2);
    head = insertAtHead(head, 3);
    head = insertAtHead(head, 4);
    head = insertAtHead(head, 5);

    Print(head);
    Clean(head);

    return 0;
}
