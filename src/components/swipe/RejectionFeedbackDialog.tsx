
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RejectionFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const RejectionFeedbackDialog = ({ open, onClose, onSubmit }: RejectionFeedbackDialogProps) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why did you reject this item?</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Please provide feedback on why you rejected this item..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          className="resize-none"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Skip
          </Button>
          <Button onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionFeedbackDialog;
