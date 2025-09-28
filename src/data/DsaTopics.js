export const dsaCategories = {
  "data-structures": {
    title: "Data Structures",
    description: "Learn fundamental and advanced data structures",
    topics: {
      arrays: {
        title: "Arrays & Strings",
        difficulty: "Beginner",
        description: "Master array operations, string manipulation, and related algorithms",
        theory: {
          definition: "An array is a collection of elements stored at contiguous memory locations. It's the simplest data structure where each data element can be accessed directly by only using its index number.",
          realWorldAnalogy: "Think of an array like a row of lockers in a gym. Each locker has a number (index), and you can directly go to any locker if you know its number.",
          coreOperations: [
            "Access - O(1)",
            "Search - O(n)", 
            "Insertion - O(n)",
            "Deletion - O(n)"
          ],
          timeComplexity: {
            access: { best: "O(1)", average: "O(1)", worst: "O(1)" },
            search: { best: "O(1)", average: "O(n)", worst: "O(n)" },
            insertion: { best: "O(1)", average: "O(n)", worst: "O(n)" },
            deletion: { best: "O(1)", average: "O(n)", worst: "O(n)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "array-basics": {
            title: "Array Basics - Declaration & Operations",
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Array declaration methods
    int arr1[5] = {1, 2, 3, 4, 5};
    vector<int> arr2 = {1, 2, 3, 4, 5};
    
    // Access elements
    cout << "First element: " << arr1[0] << endl;
    cout << "Vector element: " << arr2[0] << endl;
    
    // Traverse array
    cout << "Array elements: ";
    for(int i = 0; i < 5; i++) {
        cout << arr1[i] << " ";
    }
    cout << endl;
    
    // Vector operations
    arr2.push_back(6);  // Add element
    arr2.pop_back();    // Remove last element
    
    cout << "Vector size: " << arr2.size() << endl;
    
    return 0;
}`,
            java: `import java.util.*;

public class ArrayBasics {
    public static void main(String[] args) {
        // Array declaration
        int[] arr1 = {1, 2, 3, 4, 5};
        ArrayList<Integer> arr2 = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        // Access elements
        System.out.println("First element: " + arr1[0]);
        System.out.println("ArrayList element: " + arr2.get(0));
        
        // Traverse array
        System.out.print("Array elements: ");
        for(int i = 0; i < arr1.length; i++) {
            System.out.print(arr1[i] + " ");
        }
        System.out.println();
        
        // ArrayList operations
        arr2.add(6);           // Add element
        arr2.remove(arr2.size()-1);  // Remove last element
        
        System.out.println("ArrayList size: " + arr2.size());
    }
}`,
            python: `# Array basics in Python using lists
def array_basics():
    # List declaration
    arr1 = [1, 2, 3, 4, 5]
    arr2 = list(range(1, 6))
    
    # Access elements
    print(f"First element: {arr1[0]}")
    print(f"Last element: {arr1[-1]}")
    
    # Traverse array
    print("Array elements:", end=" ")
    for element in arr1:
        print(element, end=" ")
    print()
    
    # List operations
    arr1.append(6)      # Add element
    arr1.pop()          # Remove last element
    arr1.insert(2, 10)  # Insert at index 2
    arr1.remove(10)     # Remove by value
    
    print(f"Array length: {len(arr1)}")
    print(f"Array: {arr1}")

# Call the function
array_basics()`,
            javascript: `// Array basics in JavaScript
function arrayBasics() {
    // Array declaration
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = Array.from({length: 5}, (_, i) => i + 1);
    
    // Access elements
    console.log("First element:", arr1[0]);
    console.log("Last element:", arr1[arr1.length - 1]);
    
    // Traverse array
    console.log("Array elements:");
    for(let i = 0; i < arr1.length; i++) {
        console.log(arr1[i]);
    }
    
    // Modern iteration
    arr1.forEach(element => console.log(element));
    
    // Array operations
    arr1.push(6);           // Add element
    arr1.pop();             // Remove last element
    arr1.splice(2, 0, 10);  // Insert at index 2
    arr1.splice(2, 1);      // Remove element at index 2
    
    console.log("Array length:", arr1.length);
    console.log("Array:", arr1);
}

// Call the function
arrayBasics();`
          },
          "two-sum": {
            title: "Two Sum Problem",
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        
        for(int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if(numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            
            numMap[nums[i]] = i;
        }
        
        return {}; // No solution found
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    vector<int> result = solution.twoSum(nums, target);
    
    if(!result.empty()) {
        cout << "Indices: [" << result[0] << ", " << result[1] << "]" << endl;
        cout << "Values: [" << nums[result[0]] << ", " << nums[result[1]] << "]" << endl;
    }
    
    return 0;
}`,
            java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();
        
        for(int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if(numMap.containsKey(complement)) {
                return new int[]{numMap.get(complement), i};
            }
            
            numMap.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        
        int[] result = solution.twoSum(nums, target);
        
        if(result.length > 0) {
            System.out.println("Indices: [" + result[0] + ", " + result[1] + "]");
            System.out.println("Values: [" + nums[result[0]] + ", " + nums[result[1]] + "]");
        }
    }
}`,
            python: `def two_sum(nums, target):
    """
    Find two indices in the array that sum to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices that sum to target
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []  # No solution found

# Test the function
def main():
    nums = [2, 7, 11, 15]
    target = 9
    
    result = two_sum(nums, target)
    
    if result:
        print(f"Indices: {result}")
        print(f"Values: [{nums[result[0]]}, {nums[result[1]]}]")
    else:
        print("No solution found")

if __name__ == "__main__":
    main()`,
            javascript: `/**
 * Find two indices in the array that sum to target
 * @param {number[]} nums - Array of numbers
 * @param {number} target - Target sum
 * @return {number[]} - Array of two indices
 */
function twoSum(nums, target) {
    const numMap = new Map();
    
    for(let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if(numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Test the function
function main() {
    const nums = [2, 7, 11, 15];
    const target = 9;
    
    const result = twoSum(nums, target);
    
    if(result.length > 0) {
        console.log("Indices:", result);
        console.log("Values:", [nums[result[0]], nums[result[1]]]);
    } else {
        console.log("No solution found");
    }
}

// Call the function
main();`
          }
        }
      },
      "stacks": {
        title: "Stacks",
        difficulty: "Beginner", 
        description: "Master Last-In-First-Out (LIFO) data structure with applications",
        theory: {
          definition: "A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack.",
          realWorldAnalogy: "Think of a stack of plates in a cafeteria. You can only add or remove plates from the top. The last plate you put on the stack will be the first one you take off.",
          coreOperations: [
            "Push - O(1)",
            "Pop - O(1)",
            "Peek/Top - O(1)",
            "isEmpty - O(1)"
          ],
          timeComplexity: {
            push: { best: "O(1)", average: "O(1)", worst: "O(1)" },
            pop: { best: "O(1)", average: "O(1)", worst: "O(1)" },
            peek: { best: "O(1)", average: "O(1)", worst: "O(1)" },
            search: { best: "O(1)", average: "O(n)", worst: "O(n)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "stack-implementation": {
            title: "Stack Implementation using Array",
            cpp: `#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> arr;
    int topIndex;

public:
    Stack() : topIndex(-1) {}
    
    // Push element onto stack
    void push(int value) {
        arr.push_back(value);
        topIndex++;
        cout << value << " pushed to stack" << endl;
    }
    
    // Pop element from stack
    int pop() {
        if (isEmpty()) {
            cout << "Stack underflow! Cannot pop from empty stack" << endl;
            return -1;
        }
        
        int value = arr[topIndex];
        arr.pop_back();
        topIndex--;
        return value;
    }
    
    // Get top element without removing it
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        return arr[topIndex];
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return topIndex == -1;
    }
    
    // Get stack size
    int size() {
        return topIndex + 1;
    }
    
    // Display stack contents
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return;
        }
        
        cout << "Stack contents (top to bottom): ";
        for (int i = topIndex; i >= 0; i--) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Stack stack;
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    stack.display();
    
    cout << "Top element: " << stack.peek() << endl;
    cout << "Stack size: " << stack.size() << endl;
    
    cout << "Popped: " << stack.pop() << endl;
    cout << "Popped: " << stack.pop() << endl;
    
    stack.display();
    
    return 0;
}`,
            java: `import java.util.*;

public class Stack {
    private ArrayList<Integer> arr;
    private int topIndex;
    
    public Stack() {
        arr = new ArrayList<>();
        topIndex = -1;
    }
    
    // Push element onto stack
    public void push(int value) {
        arr.add(value);
        topIndex++;
        System.out.println(value + " pushed to stack");
    }
    
    // Pop element from stack
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack underflow! Cannot pop from empty stack");
            return -1;
        }
        
        int value = arr.get(topIndex);
        arr.remove(topIndex);
        topIndex--;
        return value;
    }
    
    // Get top element without removing it
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty!");
            return -1;
        }
        return arr.get(topIndex);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return topIndex == -1;
    }
    
    // Get stack size
    public int size() {
        return topIndex + 1;
    }
    
    // Display stack contents
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty!");
            return;
        }
        
        System.out.print("Stack contents (top to bottom): ");
        for (int i = topIndex; i >= 0; i--) {
            System.out.print(arr.get(i) + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        Stack stack = new Stack();
        
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        stack.display();
        
        System.out.println("Top element: " + stack.peek());
        System.out.println("Stack size: " + stack.size());
        
        System.out.println("Popped: " + stack.pop());
        System.out.println("Popped: " + stack.pop());
        
        stack.display();
    }
}`,
            python: `class Stack:
    def __init__(self):
        self.arr = []
    
    def push(self, value):
        """Push element onto stack"""
        self.arr.append(value)
        print(f"{value} pushed to stack")
    
    def pop(self):
        """Pop element from stack"""
        if self.is_empty():
            print("Stack underflow! Cannot pop from empty stack")
            return None
        
        return self.arr.pop()
    
    def peek(self):
        """Get top element without removing it"""
        if self.is_empty():
            print("Stack is empty!")
            return None
        
        return self.arr[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.arr) == 0
    
    def size(self):
        """Get stack size"""
        return len(self.arr)
    
    def display(self):
        """Display stack contents"""
        if self.is_empty():
            print("Stack is empty!")
            return
        
        print("Stack contents (top to bottom):", end=" ")
        for i in range(len(self.arr) - 1, -1, -1):
            print(self.arr[i], end=" ")
        print()

# Test the stack implementation
def main():
    stack = Stack()
    
    stack.push(10)
    stack.push(20)
    stack.push(30)
    
    stack.display()
    
    print(f"Top element: {stack.peek()}")
    print(f"Stack size: {stack.size()}")
    
    print(f"Popped: {stack.pop()}")
    print(f"Popped: {stack.pop()}")
    
    stack.display()

if __name__ == "__main__":
    main()`,
            javascript: `class Stack {
    constructor() {
        this.arr = [];
    }
    
    // Push element onto stack
    push(value) {
        this.arr.push(value);
        console.log(\`\${value} pushed to stack\`);
    }
    
    // Pop element from stack
    pop() {
        if (this.isEmpty()) {
            console.log("Stack underflow! Cannot pop from empty stack");
            return null;
        }
        
        return this.arr.pop();
    }
    
    // Get top element without removing it
    peek() {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return null;
        }
        
        return this.arr[this.arr.length - 1];
    }
    
    // Check if stack is empty
    isEmpty() {
        return this.arr.length === 0;
    }
    
    // Get stack size
    size() {
        return this.arr.length;
    }
    
    // Display stack contents
    display() {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return;
        }
        
        const contents = [];
        for (let i = this.arr.length - 1; i >= 0; i--) {
            contents.push(this.arr[i]);
        }
        console.log("Stack contents (top to bottom):", contents.join(" "));
    }
}

// Test the stack implementation
function main() {
    const stack = new Stack();
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    stack.display();
    
    console.log("Top element:", stack.peek());
    console.log("Stack size:", stack.size());
    
    console.log("Popped:", stack.pop());
    console.log("Popped:", stack.pop());
    
    stack.display();
}

// Call the function
main();`
          }
        }
      },
      "trees": {
        title: "Trees & Binary Trees",
        difficulty: "Intermediate",
        description: "Learn hierarchical data structures including binary trees and BST",
        theory: {
          definition: "A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has a root node and subtrees of children with a parent node, connected by edges.",
          realWorldAnalogy: "Think of a family tree or an organizational chart. There's a top-level (root), and each person can have children below them, forming a hierarchical structure.",
          coreOperations: [
            "Insertion - O(log n) average, O(n) worst",
            "Search - O(log n) average, O(n) worst", 
            "Deletion - O(log n) average, O(n) worst",
            "Traversal - O(n)"
          ],
          timeComplexity: {
            search: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
            insertion: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
            deletion: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
            traversal: { best: "O(n)", average: "O(n)", worst: "O(n)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "binary-tree": {
            title: "Binary Tree Implementation",
            cpp: `#include <iostream>
#include <queue>
using namespace std;

class TreeNode {
public:
    int data;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int value) : data(value), left(nullptr), right(nullptr) {}
};

class BinaryTree {
private:
    TreeNode* root;
    
    // Helper function for inorder traversal
    void inorderHelper(TreeNode* node) {
        if (node == nullptr) return;
        
        inorderHelper(node->left);
        cout << node->data << " ";
        inorderHelper(node->right);
    }
    
    // Helper function for preorder traversal
    void preorderHelper(TreeNode* node) {
        if (node == nullptr) return;
        
        cout << node->data << " ";
        preorderHelper(node->left);
        preorderHelper(node->right);
    }
    
    // Helper function for postorder traversal
    void postorderHelper(TreeNode* node) {
        if (node == nullptr) return;
        
        postorderHelper(node->left);
        postorderHelper(node->right);
        cout << node->data << " ";
    }

public:
    BinaryTree() : root(nullptr) {}
    
    // Insert node (level order insertion)
    void insert(int value) {
        TreeNode* newNode = new TreeNode(value);
        
        if (root == nullptr) {
            root = newNode;
            return;
        }
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            
            if (current->left == nullptr) {
                current->left = newNode;
                return;
            } else if (current->right == nullptr) {
                current->right = newNode;
                return;
            } else {
                q.push(current->left);
                q.push(current->right);
            }
        }
    }
    
    // Inorder traversal (Left-Root-Right)
    void inorderTraversal() {
        cout << "Inorder: ";
        inorderHelper(root);
        cout << endl;
    }
    
    // Preorder traversal (Root-Left-Right)
    void preorderTraversal() {
        cout << "Preorder: ";
        preorderHelper(root);
        cout << endl;
    }
    
    // Postorder traversal (Left-Right-Root)
    void postorderTraversal() {
        cout << "Postorder: ";
        postorderHelper(root);
        cout << endl;
    }
    
    // Level order traversal
    void levelOrderTraversal() {
        if (root == nullptr) return;
        
        queue<TreeNode*> q;
        q.push(root);
        
        cout << "Level order: ";
        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            
            cout << current->data << " ";
            
            if (current->left != nullptr) q.push(current->left);
            if (current->right != nullptr) q.push(current->right);
        }
        cout << endl;
    }
};

int main() {
    BinaryTree tree;
    
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    
    tree.inorderTraversal();
    tree.preorderTraversal();
    tree.postorderTraversal();
    tree.levelOrderTraversal();
    
    return 0;
}`,
            java: `import java.util.*;

class TreeNode {
    int data;
    TreeNode left, right;
    
    TreeNode(int data) {
        this.data = data;
        this.left = this.right = null;
    }
}

public class BinaryTree {
    private TreeNode root;
    
    public BinaryTree() {
        this.root = null;
    }
    
    // Insert node (level order insertion)
    public void insert(int data) {
        TreeNode newNode = new TreeNode(data);
        
        if (root == null) {
            root = newNode;
            return;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            
            if (current.left == null) {
                current.left = newNode;
                return;
            } else if (current.right == null) {
                current.right = newNode;
                return;
            } else {
                queue.offer(current.left);
                queue.offer(current.right);
            }
        }
    }
    
    // Inorder traversal (Left-Root-Right)
    public void inorderTraversal() {
        System.out.print("Inorder: ");
        inorderHelper(root);
        System.out.println();
    }
    
    private void inorderHelper(TreeNode node) {
        if (node == null) return;
        
        inorderHelper(node.left);
        System.out.print(node.data + " ");
        inorderHelper(node.right);
    }
    
    // Preorder traversal (Root-Left-Right)
    public void preorderTraversal() {
        System.out.print("Preorder: ");
        preorderHelper(root);
        System.out.println();
    }
    
    private void preorderHelper(TreeNode node) {
        if (node == null) return;
        
        System.out.print(node.data + " ");
        preorderHelper(node.left);
        preorderHelper(node.right);
    }
    
    // Postorder traversal (Left-Right-Root)
    public void postorderTraversal() {
        System.out.print("Postorder: ");
        postorderHelper(root);
        System.out.println();
    }
    
    private void postorderHelper(TreeNode node) {
        if (node == null) return;
        
        postorderHelper(node.left);
        postorderHelper(node.right);
        System.out.print(node.data + " ");
    }
    
    // Level order traversal
    public void levelOrderTraversal() {
        if (root == null) return;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        System.out.print("Level order: ");
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            System.out.print(current.data + " ");
            
            if (current.left != null) queue.offer(current.left);
            if (current.right != null) queue.offer(current.right);
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);
        tree.insert(6);
        tree.insert(7);
        
        tree.inorderTraversal();
        tree.preorderTraversal();
        tree.postorderTraversal();
        tree.levelOrderTraversal();
    }
}`,
            python: `from collections import deque

class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        """Insert node using level order insertion"""
        new_node = TreeNode(data)
        
        if self.root is None:
            self.root = new_node
            return
        
        queue = deque([self.root])
        
        while queue:
            current = queue.popleft()
            
            if current.left is None:
                current.left = new_node
                return
            elif current.right is None:
                current.right = new_node
                return
            else:
                queue.append(current.left)
                queue.append(current.right)
    
    def inorder_traversal(self):
        """Inorder traversal (Left-Root-Right)"""
        result = []
        self._inorder_helper(self.root, result)
        print("Inorder:", " ".join(map(str, result)))
    
    def _inorder_helper(self, node, result):
        if node is None:
            return
        
        self._inorder_helper(node.left, result)
        result.append(node.data)
        self._inorder_helper(node.right, result)
    
    def preorder_traversal(self):
        """Preorder traversal (Root-Left-Right)"""
        result = []
        self._preorder_helper(self.root, result)
        print("Preorder:", " ".join(map(str, result)))
    
    def _preorder_helper(self, node, result):
        if node is None:
            return
        
        result.append(node.data)
        self._preorder_helper(node.left, result)
        self._preorder_helper(node.right, result)
    
    def postorder_traversal(self):
        """Postorder traversal (Left-Right-Root)"""
        result = []
        self._postorder_helper(self.root, result)
        print("Postorder:", " ".join(map(str, result)))
    
    def _postorder_helper(self, node, result):
        if node is None:
            return
        
        self._postorder_helper(node.left, result)
        self._postorder_helper(node.right, result)
        result.append(node.data)
    
    def level_order_traversal(self):
        """Level order traversal"""
        if self.root is None:
            return
        
        queue = deque([self.root])
        result = []
        
        while queue:
            current = queue.popleft()
            result.append(current.data)
            
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        
        print("Level order:", " ".join(map(str, result)))

# Test the binary tree
def main():
    tree = BinaryTree()
    
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)
    tree.insert(7)
    
    tree.inorder_traversal()
    tree.preorder_traversal()
    tree.postorder_traversal()
    tree.level_order_traversal()

if __name__ == "__main__":
    main()`,
            javascript: `class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Insert node using level order insertion
    insert(data) {
        const newNode = new TreeNode(data);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        
        const queue = [this.root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current.left === null) {
                current.left = newNode;
                return;
            } else if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.left);
                queue.push(current.right);
            }
        }
    }
    
    // Inorder traversal (Left-Root-Right)
    inorderTraversal() {
        const result = [];
        this._inorderHelper(this.root, result);
        console.log("Inorder:", result.join(" "));
    }
    
    _inorderHelper(node, result) {
        if (node === null) return;
        
        this._inorderHelper(node.left, result);
        result.push(node.data);
        this._inorderHelper(node.right, result);
    }
    
    // Preorder traversal (Root-Left-Right)
    preorderTraversal() {
        const result = [];
        this._preorderHelper(this.root, result);
        console.log("Preorder:", result.join(" "));
    }
    
    _preorderHelper(node, result) {
        if (node === null) return;
        
        result.push(node.data);
        this._preorderHelper(node.left, result);
        this._preorderHelper(node.right, result);
    }
    
    // Postorder traversal (Left-Right-Root)
    postorderTraversal() {
        const result = [];
        this._postorderHelper(this.root, result);
        console.log("Postorder:", result.join(" "));
    }
    
    _postorderHelper(node, result) {
        if (node === null) return;
        
        this._postorderHelper(node.left, result);
        this._postorderHelper(node.right, result);
        result.push(node.data);
    }
    
    // Level order traversal
    levelOrderTraversal() {
        if (this.root === null) return;
        
        const queue = [this.root];
        const result = [];
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.data);
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        console.log("Level order:", result.join(" "));
    }
}

// Test the binary tree
function main() {
    const tree = new BinaryTree();
    
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    
    tree.inorderTraversal();
    tree.preorderTraversal();
    tree.postorderTraversal();
    tree.levelOrderTraversal();
}

// Call the function
main();`
          }
        }
      },
      "linked-lists": {
        title: "Linked Lists",
        difficulty: "Beginner",
        description: "Understand singly, doubly, and circular linked lists with operations",
        theory: {
          definition: "A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (or link) to the next node in the sequence.",
          realWorldAnalogy: "Think of a linked list like a treasure hunt. Each clue (node) contains information and tells you where to find the next clue. You must follow the chain sequentially.",
          coreOperations: [
            "Insertion at head - O(1)",
            "Insertion at tail - O(1) with tail pointer",
            "Deletion - O(1) if node reference given",
            "Search - O(n)"
          ],
          timeComplexity: {
            access: { best: "O(n)", average: "O(n)", worst: "O(n)" },
            search: { best: "O(1)", average: "O(n)", worst: "O(n)" },
            insertion: { best: "O(1)", average: "O(1)", worst: "O(1)" },
            deletion: { best: "O(1)", average: "O(1)", worst: "O(1)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "singly-linked-list": {
            title: "Singly Linked List Implementation",
            cpp: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int value) : data(value), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    Node* tail;
    int size;

public:
    LinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    // Insert at beginning
    void insertAtHead(int value) {
        Node* newNode = new Node(value);
        
        if(head == nullptr) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head = newNode;
        }
        size++;
    }
    
    // Insert at end
    void insertAtTail(int value) {
        Node* newNode = new Node(value);
        
        if(tail == nullptr) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    // Delete by value
    bool deleteValue(int value) {
        if(head == nullptr) return false;
        
        if(head->data == value) {
            Node* temp = head;
            head = head->next;
            if(head == nullptr) tail = nullptr;
            delete temp;
            size--;
            return true;
        }
        
        Node* current = head;
        while(current->next && current->next->data != value) {
            current = current->next;
        }
        
        if(current->next) {
            Node* temp = current->next;
            current->next = current->next->next;
            if(temp == tail) tail = current;
            delete temp;
            size--;
            return true;
        }
        
        return false;
    }
    
    // Display list
    void display() {
        Node* current = head;
        cout << "List: ";
        while(current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    // Get size
    int getSize() { return size; }
    
    // Destructor
    ~LinkedList() {
        while(head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    LinkedList list;
    
    list.insertAtHead(1);
    list.insertAtHead(2);
    list.insertAtTail(3);
    list.insertAtTail(4);
    
    list.display();
    cout << "Size: " << list.getSize() << endl;
    
    list.deleteValue(2);
    list.display();
    
    return 0;
}`,
            java: `class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList {
    private Node head;
    private Node tail;
    private int size;
    
    public LinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Insert at beginning
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        
        if(head == null) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
        size++;
    }
    
    // Insert at end
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        
        if(tail == null) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    // Delete by value
    public boolean deleteValue(int data) {
        if(head == null) return false;
        
        if(head.data == data) {
            head = head.next;
            if(head == null) tail = null;
            size--;
            return true;
        }
        
        Node current = head;
        while(current.next != null && current.next.data != data) {
            current = current.next;
        }
        
        if(current.next != null) {
            if(current.next == tail) tail = current;
            current.next = current.next.next;
            size--;
            return true;
        }
        
        return false;
    }
    
    // Display list
    public void display() {
        Node current = head;
        System.out.print("List: ");
        while(current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("NULL");
    }
    
    // Get size
    public int getSize() { return size; }
    
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        
        list.insertAtHead(1);
        list.insertAtHead(2);
        list.insertAtTail(3);
        list.insertAtTail(4);
        
        list.display();
        System.out.println("Size: " + list.getSize());
        
        list.deleteValue(2);
        list.display();
    }
}`,
            python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def insert_at_head(self, data):
        """Insert node at the beginning of the list"""
        new_node = Node(data)
        
        if self.head is None:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        
        self.size += 1
    
    def insert_at_tail(self, data):
        """Insert node at the end of the list"""
        new_node = Node(data)
        
        if self.tail is None:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
    
    def delete_value(self, data):
        """Delete first occurrence of value"""
        if self.head is None:
            return False
        
        if self.head.data == data:
            self.head = self.head.next
            if self.head is None:
                self.tail = None
            self.size -= 1
            return True
        
        current = self.head
        while current.next and current.next.data != data:
            current = current.next
        
        if current.next:
            if current.next == self.tail:
                self.tail = current
            current.next = current.next.next
            self.size -= 1
            return True
        
        return False
    
    def display(self):
        """Display the linked list"""
        current = self.head
        elements = []
        
        while current:
            elements.append(str(current.data))
            current = current.next
        
        print("List: " + " -> ".join(elements) + " -> NULL")
    
    def get_size(self):
        """Get the size of the list"""
        return self.size

# Test the implementation
def main():
    linked_list = LinkedList()
    
    linked_list.insert_at_head(1)
    linked_list.insert_at_head(2)
    linked_list.insert_at_tail(3)
    linked_list.insert_at_tail(4)
    
    linked_list.display()
    print(f"Size: {linked_list.get_size()}")
    
    linked_list.delete_value(2)
    linked_list.display()

if __name__ == "__main__":
    main()`,
            javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Insert at beginning
    insertAtHead(data) {
        const newNode = new Node(data);
        
        if (this.head === null) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }
    
    // Insert at end
    insertAtTail(data) {
        const newNode = new Node(data);
        
        if (this.tail === null) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    
    // Delete by value
    deleteValue(data) {
        if (this.head === null) return false;
        
        if (this.head.data === data) {
            this.head = this.head.next;
            if (this.head === null) this.tail = null;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }
        
        if (current.next) {
            if (current.next === this.tail) this.tail = current;
            current.next = current.next.next;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // Display list
    display() {
        const elements = [];
        let current = this.head;
        
        while (current) {
            elements.push(current.data);
            current = current.next;
        }
        
        console.log("List: " + elements.join(" -> ") + " -> NULL");
    }
    
    // Get size
    getSize() {
        return this.size;
    }
}

// Test the implementation
function main() {
    const list = new LinkedList();
    
    list.insertAtHead(1);
    list.insertAtHead(2);
    list.insertAtTail(3);
    list.insertAtTail(4);
    
    list.display();
    console.log("Size:", list.getSize());
    
    list.deleteValue(2);
    list.display();
}

// Call the function
main();`
          }
        }
      }
    }
  },
  "algorithms": {
    title: "Algorithms",
    description: "Master essential algorithms for problem solving",
    topics: {
      sorting: {
        title: "Sorting Algorithms",
        difficulty: "Intermediate",
        description: "Learn various sorting techniques from basic to advanced",
        theory: {
          definition: "Sorting algorithms are used to rearrange a given array or list elements according to a comparison operator on the elements.",
          realWorldAnalogy: "Like organizing books on a shelf alphabetically, or arranging playing cards by value - we need systematic methods to put things in order.",
          coreOperations: [
            "Comparison-based sorting",
            "Non-comparison sorting",
            "Stable vs Unstable sorting",
            "In-place vs Out-place sorting"
          ],
          timeComplexity: {
            bubble: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
            selection: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
            insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
            merge: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
            quick: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" }
          },
          spaceComplexity: "Varies by algorithm"
        },
        codeTemplates: {
          "bubble-sort": {
            title: "Bubble Sort Algorithm",
            cpp: `#include <iostream>
#include <vector>
using namespace std;

class BubbleSort {
public:
    static void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        
        for(int i = 0; i < n - 1; i++) {
            bool swapped = false;
            
            // Last i elements are already sorted
            for(int j = 0; j < n - i - 1; j++) {
                if(arr[j] > arr[j + 1]) {
                    swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            
            // If no swapping occurred, array is sorted
            if(!swapped) break;
        }
    }
    
    static void printArray(const vector<int>& arr) {
        for(int num : arr) {
            cout << num << " ";
        }
        cout << endl;
    }
};

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original array: ";
    BubbleSort::printArray(arr);
    
    BubbleSort::bubbleSort(arr);
    
    cout << "Sorted array: ";
    BubbleSort::printArray(arr);
    
    return 0;
}`,
            java: `import java.util.Arrays;

public class BubbleSort {
    
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for(int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            // Last i elements are already sorted
            for(int j = 0; j < n - i - 1; j++) {
                if(arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swapping occurred, array is sorted
            if(!swapped) break;
        }
    }
    
    public static void printArray(int[] arr) {
        for(int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.print("Original array: ");
        printArray(arr);
        
        bubbleSort(arr);
        
        System.out.print("Sorted array: ");
        printArray(arr);
    }
}`,
            python: `def bubble_sort(arr):
    """
    Bubble Sort Algorithm
    
    Time Complexity: O(n²) average and worst case, O(n) best case
    Space Complexity: O(1)
    
    Args:
        arr: List of comparable elements
        
    Returns:
        None (sorts in place)
    """
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is sorted
        if not swapped:
            break

def print_array(arr):
    """Print array elements"""
    print(" ".join(map(str, arr)))

# Test the algorithm
def main():
    arr = [64, 34, 25, 12, 22, 11, 90]
    
    print("Original array:", end=" ")
    print_array(arr)
    
    bubble_sort(arr)
    
    print("Sorted array:", end=" ")
    print_array(arr)

if __name__ == "__main__":
    main()`,
            javascript: `/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²) average and worst case, O(n) best case
 * Space Complexity: O(1)
 */
function bubbleSort(arr) {
    const n = arr.length;
    
    for(let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Last i elements are already sorted
        for(let j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if(!swapped) break;
    }
}

function printArray(arr) {
    console.log(arr.join(" "));
}

// Test the algorithm
function main() {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    
    console.log("Original array:");
    printArray(arr);
    
    bubbleSort(arr);
    
    console.log("Sorted array:");
    printArray(arr);
}

// Call the function
main();`
          }
        }
      },
      "merge-sort": {
        title: "Merge Sort",
        difficulty: "Intermediate",
        description: "Learn divide-and-conquer sorting algorithm with guaranteed O(n log n)",
        theory: {
          definition: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
          realWorldAnalogy: "Like organizing a large deck of cards by splitting it into smaller piles, sorting each pile, then merging them back together in order.",
          coreOperations: [
            "Divide array into halves",
            "Recursively sort each half", 
            "Merge sorted halves",
            "Stable sorting algorithm"
          ],
          timeComplexity: {
            best: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
            average: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
            worst: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "merge-sort-algorithm": {
            title: "Merge Sort Implementation",
            cpp: `#include <iostream>
#include <vector>
using namespace std;

class MergeSort {
public:
    static void mergeSort(vector<int>& arr, int left, int right) {
        if (left >= right) return;
        
        int mid = left + (right - left) / 2;
        
        // Recursively sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
    
    static void merge(vector<int>& arr, int left, int mid, int right) {
        // Create temporary arrays for left and right subarrays
        vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
        vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
        
        int i = 0, j = 0, k = left;
        
        // Merge the temporary arrays back into arr[left..right]
        while (i < leftArr.size() && j < rightArr.size()) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements of leftArr[], if any
        while (i < leftArr.size()) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        // Copy remaining elements of rightArr[], if any
        while (j < rightArr.size()) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    static void printArray(const vector<int>& arr) {
        for (int num : arr) {
            cout << num << " ";
        }
        cout << endl;
    }
};

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42};
    
    cout << "Original array: ";
    MergeSort::printArray(arr);
    
    MergeSort::mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted array: ";
    MergeSort::printArray(arr);
    
    return 0;
}`,
            java: `public class MergeSort {
    
    public static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        
        int mid = left + (right - left) / 2;
        
        // Recursively sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        // Find sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        // Create temporary arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        // Copy data to temp arrays
        for (int i = 0; i < n1; ++i)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; ++j)
            rightArr[j] = arr[mid + 1 + j];
        
        // Merge the temp arrays
        int i = 0, j = 0;
        int k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements of leftArr[], if any
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        // Copy remaining elements of rightArr[], if any
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42};
        
        System.out.print("Original array: ");
        printArray(arr);
        
        mergeSort(arr, 0, arr.length - 1);
        
        System.out.print("Sorted array: ");
        printArray(arr);
    }
}`,
            python: `def merge_sort(arr):
    """
    Merge Sort Algorithm - Divide and Conquer
    
    Time Complexity: O(n log n) in all cases
    Space Complexity: O(n)
    
    Args:
        arr: List to be sorted
        
    Returns:
        Sorted list
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # Merge the sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array
    
    Args:
        left: Sorted left array
        right: Sorted right array
        
    Returns:
        Merged sorted array
    """
    merged = []
    i = j = 0
    
    # Compare elements and merge in sorted order
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    
    # Add remaining elements from left array
    while i < len(left):
        merged.append(left[i])
        i += 1
    
    # Add remaining elements from right array
    while j < len(right):
        merged.append(right[j])
        j += 1
    
    return merged

# In-place version of merge sort
def merge_sort_inplace(arr, left=0, right=None):
    """In-place merge sort implementation"""
    if right is None:
        right = len(arr) - 1
    
    if left >= right:
        return
    
    mid = left + (right - left) // 2
    
    # Recursively sort first and second halves
    merge_sort_inplace(arr, left, mid)
    merge_sort_inplace(arr, mid + 1, right)
    
    # Merge the sorted halves
    merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """Merge function for in-place merge sort"""
    # Create temporary arrays for left and right subarrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge the temporary arrays back into arr[left..right]
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Test the implementations
def main():
    arr1 = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42]
    arr2 = arr1.copy()
    
    print("Original array:", arr1)
    
    # Test regular merge sort
    sorted_arr = merge_sort(arr1)
    print("Sorted array (merge sort):", sorted_arr)
    
    # Test in-place merge sort
    merge_sort_inplace(arr2)
    print("Sorted array (in-place):", arr2)

if __name__ == "__main__":
    main()`,
            javascript: `/**
 * Merge Sort Algorithm - Divide and Conquer
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Recursively sort both halves
    const leftSorted = mergeSort(left);
    const rightSorted = mergeSort(right);
    
    // Merge the sorted halves
    return merge(leftSorted, rightSorted);
}

function merge(left, right) {
    const merged = [];
    let i = 0, j = 0;
    
    // Compare elements and merge in sorted order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements from left array
    while (i < left.length) {
        merged.push(left[i]);
        i++;
    }
    
    // Add remaining elements from right array
    while (j < right.length) {
        merged.push(right[j]);
        j++;
    }
    
    return merged;
}

// In-place version of merge sort
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return;
    }
    
    const mid = left + Math.floor((right - left) / 2);
    
    // Recursively sort first and second halves
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    
    // Merge the sorted halves
    mergeInPlace(arr, left, mid, right);
}

function mergeInPlace(arr, left, mid, right) {
    // Create temporary arrays for left and right subarrays
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    // Merge the temporary arrays back into arr[left..right]
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

// Test the implementations
function main() {
    const arr1 = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
    const arr2 = [...arr1]; // Copy array
    
    console.log("Original array:", arr1);
    
    // Test regular merge sort
    const sortedArr = mergeSort(arr1);
    console.log("Sorted array (merge sort):", sortedArr);
    
    // Test in-place merge sort
    mergeSortInPlace(arr2);
    console.log("Sorted array (in-place):", arr2);
}

// Call the function
main();`
          }
        }
      },
      "dynamic-programming": {
        title: "Dynamic Programming",
        difficulty: "Advanced",
        description: "Master optimization problems with memoization and tabulation techniques",
        theory: {
          definition: "Dynamic Programming is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations.",
          realWorldAnalogy: "Like keeping a notebook of solutions to math problems you've solved before, so when you encounter the same problem again, you can just look up the answer instead of solving it from scratch.",
          coreOperations: [
            "Identify overlapping subproblems",
            "Optimal substructure property",
            "Memoization (top-down)",
            "Tabulation (bottom-up)"
          ],
          timeComplexity: {
            memoization: { best: "O(n)", average: "O(n)", worst: "O(n)" },
            tabulation: { best: "O(n)", average: "O(n)", worst: "O(n)" },
            naive: { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" }
          },
          spaceComplexity: "O(n)"
        },
        codeTemplates: {
          "fibonacci-dp": {
            title: "Fibonacci - Dynamic Programming",
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class FibonacciDP {
public:
    // Naive recursive approach - O(2^n) time
    static long long fibonacciNaive(int n) {
        if (n <= 1) return n;
        return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
    }
    
    // Memoization approach - O(n) time, O(n) space
    static long long fibonacciMemo(int n, unordered_map<int, long long>& memo) {
        if (n <= 1) return n;
        
        if (memo.find(n) != memo.end()) {
            return memo[n];
        }
        
        memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        return memo[n];
    }
    
    // Tabulation approach - O(n) time, O(n) space
    static long long fibonacciTab(int n) {
        if (n <= 1) return n;
        
        vector<long long> dp(n + 1);
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space optimized approach - O(n) time, O(1) space
    static long long fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        long long prev2 = 0, prev1 = 1;
        long long current;
        
        for (int i = 2; i <= n; i++) {
            current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return current;
    }
};

int main() {
    int n = 10;
    
    cout << "Computing Fibonacci for n = " << n << endl;
    
    // Memoization
    unordered_map<int, long long> memo;
    cout << "Memoization: " << FibonacciDP::fibonacciMemo(n, memo) << endl;
    
    // Tabulation
    cout << "Tabulation: " << FibonacciDP::fibonacciTab(n) << endl;
    
    // Space optimized
    cout << "Optimized: " << FibonacciDP::fibonacciOptimized(n) << endl;
    
    // Performance comparison for larger n
    n = 40;
    cout << "\nFor n = " << n << ":" << endl;
    cout << "Tabulation: " << FibonacciDP::fibonacciTab(n) << endl;
    cout << "Optimized: " << FibonacciDP::fibonacciOptimized(n) << endl;
    
    return 0;
}`,
            java: `import java.util.*;

public class FibonacciDP {
    
    // Naive recursive approach - O(2^n) time
    public static long fibonacciNaive(int n) {
        if (n <= 1) return n;
        return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
    }
    
    // Memoization approach - O(n) time, O(n) space
    public static long fibonacciMemo(int n, Map<Integer, Long> memo) {
        if (n <= 1) return n;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        memo.put(n, result);
        return result;
    }
    
    // Tabulation approach - O(n) time, O(n) space
    public static long fibonacciTab(int n) {
        if (n <= 1) return n;
        
        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space optimized approach - O(n) time, O(1) space
    public static long fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        long prev2 = 0, prev1 = 1;
        long current = 0;
        
        for (int i = 2; i <= n; i++) {
            current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return current;
    }
    
    public static void main(String[] args) {
        int n = 10;
        
        System.out.println("Computing Fibonacci for n = " + n);
        
        // Memoization
        Map<Integer, Long> memo = new HashMap<>();
        System.out.println("Memoization: " + fibonacciMemo(n, memo));
        
        // Tabulation
        System.out.println("Tabulation: " + fibonacciTab(n));
        
        // Space optimized
        System.out.println("Optimized: " + fibonacciOptimized(n));
        
        // Performance comparison for larger n
        n = 40;
        System.out.println("\nFor n = " + n + ":");
        System.out.println("Tabulation: " + fibonacciTab(n));
        System.out.println("Optimized: " + fibonacciOptimized(n));
    }
}`,
            python: `def fibonacci_naive(n):
    """
    Naive recursive approach - O(2^n) time
    This will be very slow for large n
    """
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)

def fibonacci_memo(n, memo=None):
    """
    Memoization approach - O(n) time, O(n) space
    Top-down dynamic programming
    """
    if memo is None:
        memo = {}
    
    if n <= 1:
        return n
    
    if n in memo:
        return memo[n]
    
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

def fibonacci_tab(n):
    """
    Tabulation approach - O(n) time, O(n) space
    Bottom-up dynamic programming
    """
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

def fibonacci_optimized(n):
    """
    Space optimized approach - O(n) time, O(1) space
    Only keep track of last two values
    """
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1

def fibonacci_generator(n):
    """
    Generator function to yield fibonacci sequence
    """
    a, b = 0, 1
    for _ in range(n + 1):
        yield a
        a, b = b, a + b

# Decorator for memoization
def memoize(func):
    cache = {}
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def fibonacci_decorated(n):
    """Using decorator for memoization"""
    if n <= 1:
        return n
    return fibonacci_decorated(n - 1) + fibonacci_decorated(n - 2)

# Performance testing
import time

def time_function(func, n, *args):
    """Utility function to time execution"""
    start = time.time()
    result = func(n, *args)
    end = time.time()
    return result, end - start

def main():
    n = 10
    print(f"Computing Fibonacci for n = {n}")
    
    # Test different approaches
    result, exec_time = time_function(fibonacci_memo, n)
    print(f"Memoization: {result} (Time: {exec_time:.6f}s)")
    
    result, exec_time = time_function(fibonacci_tab, n)
    print(f"Tabulation: {result} (Time: {exec_time:.6f}s)")
    
    result, exec_time = time_function(fibonacci_optimized, n)
    print(f"Optimized: {result} (Time: {exec_time:.6f}s)")
    
    # Generator approach
    print(f"Generator: {list(fibonacci_generator(n))}")
    
    # Performance comparison for larger n
    n = 35
    print(f"\nFor n = {n}:")
    
    result, exec_time = time_function(fibonacci_tab, n)
    print(f"Tabulation: {result} (Time: {exec_time:.6f}s)")
    
    result, exec_time = time_function(fibonacci_optimized, n)
    print(f"Optimized: {result} (Time: {exec_time:.6f}s)")

if __name__ == "__main__":
    main()`,
            javascript: `/**
 * Fibonacci using Dynamic Programming
 * Demonstrating different approaches and their time complexities
 */

// Naive recursive approach - O(2^n) time
function fibonacciNaive(n) {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Memoization approach - O(n) time, O(n) space
function fibonacciMemo(n, memo = {}) {
    if (n <= 1) return n;
    
    if (n in memo) {
        return memo[n];
    }
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Tabulation approach - O(n) time, O(n) space
function fibonacciTab(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space optimized approach - O(n) time, O(1) space
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    let current;
    
    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return current;
}

// Using closures for memoization
const fibonacciClosure = (() => {
    const cache = {};
    
    return function(n) {
        if (n <= 1) return n;
        
        if (cache[n]) return cache[n];
        
        cache[n] = fibonacciClosure(n - 1) + fibonacciClosure(n - 2);
        return cache[n];
    };
})();

// Generator function for fibonacci sequence
function* fibonacciGenerator(n) {
    let a = 0, b = 1;
    
    for (let i = 0; i <= n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Performance testing utility
function timeFunction(func, n, ...args) {
    const start = performance.now();
    const result = func(n, ...args);
    const end = performance.now();
    return { result, time: end - start };
}

// ES6 Class approach
class FibonacciDP {
    constructor() {
        this.cache = {};
    }
    
    compute(n) {
        if (n <= 1) return n;
        
        if (this.cache[n]) return this.cache[n];
        
        this.cache[n] = this.compute(n - 1) + this.compute(n - 2);
        return this.cache[n];
    }
    
    getSequence(n) {
        const sequence = [];
        for (let i = 0; i <= n; i++) {
            sequence.push(this.compute(i));
        }
        return sequence;
    }
}

// Main function to test all approaches
function main() {
    let n = 10;
    console.log(\`Computing Fibonacci for n = \${n}\`);
    
    // Test different approaches
    let { result, time } = timeFunction(fibonacciMemo, n);
    console.log(\`Memoization: \${result} (Time: \${time.toFixed(4)}ms)\`);
    
    ({ result, time } = timeFunction(fibonacciTab, n));
    console.log(\`Tabulation: \${result} (Time: \${time.toFixed(4)}ms)\`);
    
    ({ result, time } = timeFunction(fibonacciOptimized, n));
    console.log(\`Optimized: \${result} (Time: \${time.toFixed(4)}ms)\`);
    
    // Generator approach
    const fibGen = [...fibonacciGenerator(n)];
    console.log(\`Generator: \${fibGen}\`);
    
    // Class approach
    const fibDP = new FibonacciDP();
    console.log(\`Class approach: \${fibDP.compute(n)}\`);
    console.log(\`Sequence: \${fibDP.getSequence(n)}\`);
    
    // Performance comparison for larger n
    n = 35;
    console.log(\`\nFor n = \${n}:\`);
    
    ({ result, time } = timeFunction(fibonacciTab, n));
    console.log(\`Tabulation: \${result} (Time: \${time.toFixed(4)}ms)\`);
    
    ({ result, time } = timeFunction(fibonacciOptimized, n));
    console.log(\`Optimized: \${result} (Time: \${time.toFixed(4)}ms)\`);
}

// Call the function
main();`
          }
        }
      }
    }
  },
  "advanced-topics": {
    title: "Advanced Topics",
    description: "Explore advanced data structures and algorithms",
    topics: {
      "graphs": {
        title: "Graph Algorithms",
        difficulty: "Advanced",
        description: "Master graph traversal, shortest paths, and advanced graph algorithms",
        theory: {
          definition: "A graph is a collection of nodes (vertices) connected by edges. Graphs are used to represent relationships between objects and solve complex problems like finding shortest paths, network analysis, and social networks.",
          realWorldAnalogy: "Think of a social network like Facebook - people are nodes and friendships are edges connecting them. Or consider a road map where cities are nodes and roads are edges.",
          coreOperations: [
            "Graph Traversal (BFS, DFS) - O(V + E)",
            "Shortest Path (Dijkstra) - O(V log V + E)",
            "Minimum Spanning Tree - O(E log V)",
            "Topological Sort - O(V + E)"
          ],
          timeComplexity: {
            bfs: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
            dfs: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
            dijkstra: { best: "O(V log V + E)", average: "O(V log V + E)", worst: "O(V log V + E)" }
          },
          spaceComplexity: "O(V + E)"
        },
        codeTemplates: {
          "graph-bfs-dfs": {
            title: "Graph BFS and DFS Implementation", 
            cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <unordered_set>
using namespace std;

class Graph {
private:
    int vertices;
    vector<vector<int>> adjList;

public:
    Graph(int V) : vertices(V) {
        adjList.resize(V);
    }
    
    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u); // For undirected graph
    }
    
    // Breadth-First Search
    void BFS(int startVertex) {
        vector<bool> visited(vertices, false);
        queue<int> q;
        
        visited[startVertex] = true;
        q.push(startVertex);
        
        cout << "BFS traversal starting from vertex " << startVertex << ": ";
        
        while (!q.empty()) {
            int current = q.front();
            q.pop();
            cout << current << " ";
            
            // Visit all unvisited adjacent vertices
            for (int neighbor : adjList[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        cout << endl;
    }
    
    // Depth-First Search (Recursive)
    void DFS(int startVertex) {
        vector<bool> visited(vertices, false);
        cout << "DFS traversal starting from vertex " << startVertex << ": ";
        DFSUtil(startVertex, visited);
        cout << endl;
    }
    
private:
    void DFSUtil(int vertex, vector<bool>& visited) {
        visited[vertex] = true;
        cout << vertex << " ";
        
        // Visit all unvisited adjacent vertices
        for (int neighbor : adjList[vertex]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }

public:
    // Iterative DFS using stack
    void DFSIterative(int startVertex) {
        vector<bool> visited(vertices, false);
        stack<int> s;
        
        s.push(startVertex);
        
        cout << "DFS iterative traversal starting from vertex " << startVertex << ": ";
        
        while (!s.empty()) {
            int current = s.top();
            s.pop();
            
            if (!visited[current]) {
                visited[current] = true;
                cout << current << " ";
                
                // Add all unvisited neighbors to stack
                for (int neighbor : adjList[current]) {
                    if (!visited[neighbor]) {
                        s.push(neighbor);
                    }
                }
            }
        }
        cout << endl;
    }
    
    // Check if path exists between two vertices
    bool hasPath(int start, int end) {
        if (start == end) return true;
        
        vector<bool> visited(vertices, false);
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int current = q.front();
            q.pop();
            
            for (int neighbor : adjList[current]) {
                if (neighbor == end) return true;
                
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        
        return false;
    }
    
    void printGraph() {
        cout << "Graph adjacency list:" << endl;
        for (int i = 0; i < vertices; i++) {
            cout << i << ": ";
            for (int neighbor : adjList[i]) {
                cout << neighbor << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    // Create a graph with 6 vertices
    Graph g(6);
    
    // Add edges
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 4);
    g.addEdge(3, 4);
    g.addEdge(3, 5);
    g.addEdge(4, 5);
    
    g.printGraph();
    cout << endl;
    
    // Perform traversals
    g.BFS(0);
    g.DFS(0);
    g.DFSIterative(0);
    
    // Check path existence
    cout << "Path from 0 to 5: " << (g.hasPath(0, 5) ? "Yes" : "No") << endl;
    cout << "Path from 1 to 2: " << (g.hasPath(1, 2) ? "Yes" : "No") << endl;
    
    return 0;
}`,
            java: `import java.util.*;

public class Graph {
    private int vertices;
    private List<List<Integer>> adjList;
    
    public Graph(int vertices) {
        this.vertices = vertices;
        this.adjList = new ArrayList<>();
        
        for (int i = 0; i < vertices; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u); // For undirected graph
    }
    
    // Breadth-First Search
    public void BFS(int startVertex) {
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[startVertex] = true;
        queue.offer(startVertex);
        
        System.out.print("BFS traversal starting from vertex " + startVertex + ": ");
        
        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.print(current + " ");
            
            // Visit all unvisited adjacent vertices
            for (int neighbor : adjList.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }
    
    // Depth-First Search (Recursive)
    public void DFS(int startVertex) {
        boolean[] visited = new boolean[vertices];
        System.out.print("DFS traversal starting from vertex " + startVertex + ": ");
        DFSUtil(startVertex, visited);
        System.out.println();
    }
    
    private void DFSUtil(int vertex, boolean[] visited) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        
        // Visit all unvisited adjacent vertices
        for (int neighbor : adjList.get(vertex)) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }
    
    // Iterative DFS using stack
    public void DFSIterative(int startVertex) {
        boolean[] visited = new boolean[vertices];
        Stack<Integer> stack = new Stack<>();
        
        stack.push(startVertex);
        
        System.out.print("DFS iterative traversal starting from vertex " + startVertex + ": ");
        
        while (!stack.isEmpty()) {
            int current = stack.pop();
            
            if (!visited[current]) {
                visited[current] = true;
                System.out.print(current + " ");
                
                // Add all unvisited neighbors to stack
                for (int neighbor : adjList.get(current)) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        System.out.println();
    }
    
    // Check if path exists between two vertices
    public boolean hasPath(int start, int end) {
        if (start == end) return true;
        
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int current = queue.poll();
            
            for (int neighbor : adjList.get(current)) {
                if (neighbor == end) return true;
                
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        
        return false;
    }
    
    public void printGraph() {
        System.out.println("Graph adjacency list:");
        for (int i = 0; i < vertices; i++) {
            System.out.print(i + ": ");
            for (int neighbor : adjList.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        // Create a graph with 6 vertices
        Graph g = new Graph(6);
        
        // Add edges
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        g.addEdge(2, 4);
        g.addEdge(3, 4);
        g.addEdge(3, 5);
        g.addEdge(4, 5);
        
        g.printGraph();
        System.out.println();
        
        // Perform traversals
        g.BFS(0);
        g.DFS(0);
        g.DFSIterative(0);
        
        // Check path existence
        System.out.println("Path from 0 to 5: " + (g.hasPath(0, 5) ? "Yes" : "No"));
        System.out.println("Path from 1 to 2: " + (g.hasPath(1, 2) ? "Yes" : "No"));
    }
}`,
            python: `from collections import deque, defaultdict

class Graph:
    def __init__(self, vertices):
        self.vertices = vertices
        self.adj_list = defaultdict(list)
    
    def add_edge(self, u, v):
        """Add an edge between vertices u and v"""
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)  # For undirected graph
    
    def bfs(self, start_vertex):
        """Breadth-First Search traversal"""
        visited = [False] * self.vertices
        queue = deque([start_vertex])
        visited[start_vertex] = True
        
        result = []
        
        while queue:
            current = queue.popleft()
            result.append(current)
            
            # Visit all unvisited adjacent vertices
            for neighbor in self.adj_list[current]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)
        
        return result
    
    def dfs_recursive(self, start_vertex):
        """Depth-First Search (Recursive)"""
        visited = [False] * self.vertices
        result = []
        
        def dfs_util(vertex):
            visited[vertex] = True
            result.append(vertex)
            
            # Visit all unvisited adjacent vertices
            for neighbor in self.adj_list[vertex]:
                if not visited[neighbor]:
                    dfs_util(neighbor)
        
        dfs_util(start_vertex)
        return result
    
    def dfs_iterative(self, start_vertex):
        """Iterative DFS using stack"""
        visited = [False] * self.vertices
        stack = [start_vertex]
        result = []
        
        while stack:
            current = stack.pop()
            
            if not visited[current]:
                visited[current] = True
                result.append(current)
                
                # Add all unvisited neighbors to stack
                for neighbor in self.adj_list[current]:
                    if not visited[neighbor]:
                        stack.append(neighbor)
        
        return result
    
    def has_path(self, start, end):
        """Check if path exists between two vertices using BFS"""
        if start == end:
            return True
        
        visited = [False] * self.vertices
        queue = deque([start])
        visited[start] = True
        
        while queue:
            current = queue.popleft()
            
            for neighbor in self.adj_list[current]:
                if neighbor == end:
                    return True
                
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)
        
        return False
    
    def get_shortest_path(self, start, end):
        """Find shortest path between two vertices using BFS"""
        if start == end:
            return [start]
        
        visited = [False] * self.vertices
        queue = deque([(start, [start])])
        visited[start] = True
        
        while queue:
            current, path = queue.popleft()
            
            for neighbor in self.adj_list[current]:
                if neighbor == end:
                    return path + [neighbor]
                
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append((neighbor, path + [neighbor]))
        
        return []  # No path found
    
    def print_graph(self):
        """Print the graph adjacency list"""
        print("Graph adjacency list:")
        for vertex in range(self.vertices):
            neighbors = self.adj_list[vertex]
            print(f"{vertex}: {' '.join(map(str, neighbors))}")
    
    def get_connected_components(self):
        """Find all connected components in the graph"""
        visited = [False] * self.vertices
        components = []
        
        for vertex in range(self.vertices):
            if not visited[vertex]:
                component = []
                stack = [vertex]
                
                while stack:
                    current = stack.pop()
                    if not visited[current]:
                        visited[current] = True
                        component.append(current)
                        
                        for neighbor in self.adj_list[current]:
                            if not visited[neighbor]:
                                stack.append(neighbor)
                
                components.append(sorted(component))
        
        return components

def main():
    # Create a graph with 6 vertices
    g = Graph(6)
    
    # Add edges
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 3)
    g.add_edge(1, 4)
    g.add_edge(2, 4)
    g.add_edge(3, 4)
    g.add_edge(3, 5)
    g.add_edge(4, 5)
    
    g.print_graph()
    print()
    
    # Perform traversals
    print("BFS traversal from vertex 0:", g.bfs(0))
    print("DFS recursive traversal from vertex 0:", g.dfs_recursive(0))
    print("DFS iterative traversal from vertex 0:", g.dfs_iterative(0))
    
    # Check path existence
    print(f"Path from 0 to 5: {'Yes' if g.has_path(0, 5) else 'No'}")
    print(f"Path from 1 to 2: {'Yes' if g.has_path(1, 2) else 'No'}")
    
    # Find shortest path
    shortest_path = g.get_shortest_path(0, 5)
    print(f"Shortest path from 0 to 5: {' -> '.join(map(str, shortest_path))}")
    
    # Get connected components
    components = g.get_connected_components()
    print(f"Connected components: {components}")

if __name__ == "__main__":
    main()`,
            javascript: `class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Map();
        
        // Initialize adjacency list
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }
    
    addEdge(u, v) {
        this.adjList.get(u).push(v);
        this.adjList.get(v).push(u); // For undirected graph
    }
    
    // Breadth-First Search
    bfs(startVertex) {
        const visited = new Array(this.vertices).fill(false);
        const queue = [startVertex];
        const result = [];
        
        visited[startVertex] = true;
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            
            // Visit all unvisited adjacent vertices
            for (const neighbor of this.adjList.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // Depth-First Search (Recursive)
    dfsRecursive(startVertex) {
        const visited = new Array(this.vertices).fill(false);
        const result = [];
        
        const dfsUtil = (vertex) => {
            visited[vertex] = true;
            result.push(vertex);
            
            // Visit all unvisited adjacent vertices
            for (const neighbor of this.adjList.get(vertex)) {
                if (!visited[neighbor]) {
                    dfsUtil(neighbor);
                }
            }
        };
        
        dfsUtil(startVertex);
        return result;
    }
    
    // Iterative DFS using stack
    dfsIterative(startVertex) {
        const visited = new Array(this.vertices).fill(false);
        const stack = [startVertex];
        const result = [];
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            if (!visited[current]) {
                visited[current] = true;
                result.push(current);
                
                // Add all unvisited neighbors to stack
                for (const neighbor of this.adjList.get(current)) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
    
    // Check if path exists between two vertices
    hasPath(start, end) {
        if (start === end) return true;
        
        const visited = new Array(this.vertices).fill(false);
        const queue = [start];
        
        visited[start] = true;
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            for (const neighbor of this.adjList.get(current)) {
                if (neighbor === end) return true;
                
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        
        return false;
    }
    
    // Find shortest path between two vertices
    getShortestPath(start, end) {
        if (start === end) return [start];
        
        const visited = new Array(this.vertices).fill(false);
        const queue = [[start, [start]]];
        
        visited[start] = true;
        
        while (queue.length > 0) {
            const [current, path] = queue.shift();
            
            for (const neighbor of this.adjList.get(current)) {
                if (neighbor === end) {
                    return [...path, neighbor];
                }
                
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push([neighbor, [...path, neighbor]]);
                }
            }
        }
        
        return []; // No path found
    }
    
    // Get all connected components
    getConnectedComponents() {
        const visited = new Array(this.vertices).fill(false);
        const components = [];
        
        for (let vertex = 0; vertex < this.vertices; vertex++) {
            if (!visited[vertex]) {
                const component = [];
                const stack = [vertex];
                
                while (stack.length > 0) {
                    const current = stack.pop();
                    
                    if (!visited[current]) {
                        visited[current] = true;
                        component.push(current);
                        
                        for (const neighbor of this.adjList.get(current)) {
                            if (!visited[neighbor]) {
                                stack.push(neighbor);
                            }
                        }
                    }
                }
                
                components.push(component.sort((a, b) => a - b));
            }
        }
        
        return components;
    }
    
    printGraph() {
        console.log("Graph adjacency list:");
        for (let i = 0; i < this.vertices; i++) {
            const neighbors = this.adjList.get(i);
            console.log(\`\${i}: \${neighbors.join(" ")}\`);
        }
    }
}

function main() {
    // Create a graph with 6 vertices
    const g = new Graph(6);
    
    // Add edges
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 4);
    g.addEdge(3, 4);
    g.addEdge(3, 5);
    g.addEdge(4, 5);
    
    g.printGraph();
    console.log();
    
    // Perform traversals
    console.log("BFS traversal from vertex 0:", g.bfs(0));
    console.log("DFS recursive traversal from vertex 0:", g.dfsRecursive(0));
    console.log("DFS iterative traversal from vertex 0:", g.dfsIterative(0));
    
    // Check path existence
    console.log(\`Path from 0 to 5: \${g.hasPath(0, 5) ? "Yes" : "No"}\`);
    console.log(\`Path from 1 to 2: \${g.hasPath(1, 2) ? "Yes" : "No"}\`);
    
    // Find shortest path
    const shortestPath = g.getShortestPath(0, 5);
    console.log(\`Shortest path from 0 to 5: \${shortestPath.join(" -> ")}\`);
    
    // Get connected components
    const components = g.getConnectedComponents();
    console.log(\`Connected components: \${JSON.stringify(components)}\`);
}

// Call the function
main();`
          }
        }
      }
    }
  }
};