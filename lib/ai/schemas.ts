import { z } from 'zod'

// Enhanced AI Analysis Schemas for Living Room Intelligence

// Basic room analysis schema (legacy compatibility)
export const BasicRoomAnalysisSchema = z.object({
  description: z.string().describe("A brief, one-paragraph description of the room's current state, style, and key features."),
  tags: z.array(z.string()).describe("A list of 5-10 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered')."),
  colorPalette: z
    .array(z.string())
    .describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray').")
    .optional(),
})

// Enhanced living room analysis schema (matching AI output format)
export const LivingRoomAnalysisSchema = z.object({
  // Basic room information
  description: z.string().describe("A comprehensive description of the living room's current state, style, layout, and key features.").optional(),
  tags: z.array(z.string()).describe("A list of 8-12 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered', 'open-plan').").optional(),
  colorPalette: z
    .array(z.string())
    .describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray').")
    .optional(),

  // Furniture identification and assessment (matching AI output)
  furnitureIdentification: z.array(z.object({
    type: z.string().describe("Type of furniture (e.g., 'sofa', 'coffee-table', 'floor-lamp', 'bookshelf')"),
    condition: z.enum(['good', 'fair', 'poor', 'needs-replacement', 'healthy']).describe("Current condition of the furniture piece"),
    placement: z.string().describe("Current placement context (e.g., 'center', 'wall', 'corner', 'floating')"),
    size: z.enum(['small', 'medium', 'large']).describe("Relative size of the furniture piece"),
    style: z.string().describe("Current style of the furniture piece"),
    replacementPriority: z.enum(['essential', 'recommended', 'optional']).describe("Priority for replacement based on condition and style fit"),
    replacementReason: z.string().describe("Brief explanation for replacement recommendation")
  })).describe("Detailed analysis of all visible furniture pieces in the room"),

  // Spatial analysis
  spatialAnalysis: z.object({
    roomSize: z.enum(['small', 'medium', 'large']).describe("Overall room size category"),
    layout: z.string().describe("Room layout type (e.g., 'open-plan', 'rectangular', 'L-shaped', 'square')"),
    trafficFlow: z.array(z.string()).describe("Identified traffic flow patterns and pathways"),
    focalPoints: z.array(z.string()).describe("Key focal points in the room (e.g., 'fireplace', 'tv', 'window', 'artwork')"),
    problemAreas: z.array(z.string()).describe("Areas that need improvement (e.g., 'cluttered-corner', 'poor-lighting', 'awkward-seating')"),
    opportunities: z.array(z.string()).describe("Opportunities for improvement (e.g., 'add-storage', 'improve-lighting', 'better-seating-arrangement')")
  }).describe("Comprehensive spatial analysis of the living room"),

  // Replacement recommendations (matching AI output)
  replacementRecommendations: z.array(z.object({
    category: z.string().describe("Furniture category that needs replacement (e.g., 'seating', 'tables', 'lighting')"),
    priority: z.enum(['essential', 'recommended', 'optional']).describe("Priority level for replacement"),
    reason: z.string().describe("Detailed explanation for why this replacement is needed"),
    currentIssues: z.array(z.string()).describe("Specific issues with current furniture"),
    desiredOutcome: z.string().describe("What the replacement should achieve")
  })).describe("Structured replacement recommendations based on analysis"),

  // Style analysis (matching AI output)
  styleTransformation: z.object({
    currentStyle: z.string().describe("Identified current style of the room"),
    styleCoherence: z.enum(['excellent', 'good', 'fair', 'poor']).describe("How well current elements work together"),
    styleConflicts: z.array(z.string()).describe("Elements that don't match the overall style"),
    transformationOpportunities: z.array(z.string()).describe("Key opportunities to improve style coherence"),
    recommendedStyle: z.string().describe("Recommended style direction based on user preferences and room analysis")
  }).describe("Analysis of current style and transformation opportunities"),

  // Lifestyle compatibility (optional for now)
  lifestyleCompatibility: z.object({
    spaceEfficiency: z.enum(['excellent', 'good', 'fair', 'poor']).describe("How well the space serves the user's lifestyle needs"),
    functionality: z.enum(['excellent', 'good', 'fair', 'poor']).describe("Overall functionality of the current setup"),
    comfortLevel: z.enum(['excellent', 'good', 'fair', 'poor']).describe("Current comfort level of the space"),
    lifestyleMatches: z.array(z.string()).describe("How well current setup matches user's lifestyle tags"),
    lifestyleGaps: z.array(z.string()).describe("Gaps between current setup and lifestyle needs")
  }).describe("Analysis of how well the room serves the user's lifestyle needs").optional()
})

// Type exports for use in other files
export type BasicRoomAnalysis = z.infer<typeof BasicRoomAnalysisSchema>
export type LivingRoomAnalysis = z.infer<typeof LivingRoomAnalysisSchema>
export type FurnitureIdentification = z.infer<typeof LivingRoomAnalysisSchema>['furnitureIdentification'][0]
export type SpatialAnalysis = z.infer<typeof LivingRoomAnalysisSchema>['spatialAnalysis']
export type ReplacementRecommendation = z.infer<typeof LivingRoomAnalysisSchema>['replacementRecommendations'][0]
export type StyleTransformation = z.infer<typeof LivingRoomAnalysisSchema>['styleTransformation']
export type LifestyleCompatibility = z.infer<typeof LivingRoomAnalysisSchema>['lifestyleCompatibility']
