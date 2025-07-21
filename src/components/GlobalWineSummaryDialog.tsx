import { useState } from "react";
import type { Wine, ScoringCriterion } from "../types/wine";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useDialog } from "../contexts/DialogContext";

interface GlobalWineSummaryDialogProps {
  wine: Wine;
  criteria: ScoringCriterion[];
  onSubmit: () => void;
}

export function GlobalWineSummaryDialog({
  wine,
  criteria,
  onSubmit,
}: GlobalWineSummaryDialogProps) {
  const { showDialog, hideDialog } = useDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit();
      hideDialog();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMaxPossibleScore = () => {
    return criteria.reduce((sum, criterion) => sum + criterion.maxScore, 0);
  };

  const maxPossibleScore = getMaxPossibleScore();
  const scorePercentage = maxPossibleScore > 0 ? (wine.totalScore / maxPossibleScore) * 100 : 0;

  const openDialog = () => {
    showDialog(
      <div style={{ minWidth: '600px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          color: '#1f2937'
        }}>
          Score Summary - {wine.anonymousId}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '16px', 
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Review your scores before submitting
        </p>

        <div style={{ marginBottom: '24px' }}>
          {/* Wine Info */}
          <div style={{
            textAlign: 'center',
            padding: '24px',
            background: 'linear-gradient(to right, #eff6ff, #e0e7ff)',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
              {wine.anonymousId}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              {wine.category}
            </div>
          </div>

          {/* Score Summary */}
          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
                {wine.totalScore}
                <span style={{ fontSize: '24px', color: '#6b7280' }}>/{maxPossibleScore}</span>
              </div>
              <div style={{ fontSize: '18px', color: '#374151', fontWeight: '500' }}>
                {scorePercentage.toFixed(1)}% Complete
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '8px', height: '16px' }}>
              <div
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                  height: '16px',
                  borderRadius: '8px',
                  transition: 'width 0.5s ease',
                  width: `${scorePercentage}%`
                }}
              />
            </div>
          </div>

          {/* Individual Scores */}
          <div style={{ maxHeight: '256px', overflowY: 'auto' }}>
            {criteria.map((criterion) => {
              const score = wine.scores[criterion.id] || 0;
              const comment = wine.comments[criterion.id] || "";
              const isScored = score > 0;
              
              return (
                <div
                  key={criterion.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>
                        {criterion.name}
                      </span>
                      {isScored ? (
                        <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />
                      ) : (
                        <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                      )}
                    </div>
                    {comment && (
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        "{comment}"
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                      {score}/{criterion.maxScore}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            onClick={hideDialog}
            disabled={isSubmitting}
            style={{
              padding: '8px 24px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              padding: '8px 32px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Button
      onClick={openDialog}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
    >
      Review & Submit Score
    </Button>
  );
} 